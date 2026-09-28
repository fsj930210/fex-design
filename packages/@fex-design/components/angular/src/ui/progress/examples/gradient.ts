import { Component } from "@angular/core"
import { ProgressComponent } from "../progress.component"
@Component({ selector: "progress-gradient-example", standalone: true, imports: [ProgressComponent], templateUrl: "./gradient.html" })
export class ProgressGradientExample { readonly gradient = { from: "#1677ff", to: "#87d068" } as const }
