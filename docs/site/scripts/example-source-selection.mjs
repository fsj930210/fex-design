import ts from 'typescript'

// Select the declarations actually imported by one demo, plus their dependencies.
export function selectExampleDeclarations(source, names) {
  if (!names?.size) return source
  const file = ts.createSourceFile('example-data.ts', source, ts.ScriptTarget.Latest, true)
  const definitions = new Map()
  for (const statement of file.statements) {
    const declarations = ts.isVariableStatement(statement)
      ? statement.declarationList.declarations.map((declaration) => declaration.name.getText(file))
      : statement.name
        ? [statement.name.getText(file)]
        : []
    for (const name of declarations) definitions.set(name, statement)
  }
  const required = new Set(names)
  const selected = new Set()
  const visit = (node) => {
    if (ts.isIdentifier(node)) required.add(node.text)
    ts.forEachChild(node, visit)
  }
  let changed = true
  while (changed) {
    changed = false
    for (const name of required) {
      const statement = definitions.get(name)
      if (!statement || selected.has(statement)) continue
      selected.add(statement)
      visit(statement)
      changed = true
    }
  }
  return (
    file.statements
      .flatMap((statement) => {
        if (selected.has(statement)) return [statement.getText(file)]
        if (!ts.isImportDeclaration(statement)) return []
        const clause = statement.importClause
        if (!clause?.namedBindings || !ts.isNamedImports(clause.namedBindings))
          return [statement.getText(file)]
        const bindings = clause.namedBindings.elements.filter((binding) =>
          required.has(binding.name.text),
        )
        if (!bindings.length) return []
        return [
          `import ${clause.isTypeOnly ? 'type ' : ''}{ ${bindings.map((binding) => binding.getText(file)).join(', ')} } from ${statement.moduleSpecifier.getText(file)}`,
        ]
      })
      .join('\n\n') + '\n'
  )
}

export function importedExampleNames(source, specifier) {
  const names = new Set()
  for (const match of source.matchAll(
    /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s*['"]([^'"]+)['"]/g,
  )) {
    if (match[2] !== specifier) continue
    for (const name of match[1].split(','))
      names.add(
        name
          .trim()
          .replace(/^type\s+/, '')
          .split(/\s+as\s+/)[0],
      )
  }
  return names
}
