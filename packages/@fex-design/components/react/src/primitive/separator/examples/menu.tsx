import { Separator } from '@fex-design/react/primitive/separator'
export const MenuDemo = () => (
  <div className="grid w-full max-w-sm gap-1.5">
    <div>
      <div className="font-medium">Settings</div>
      <div className="text-sm text-muted-foreground">Manage preferences</div>
    </div>
    <div>
      <div className="font-medium">Account</div>
      <div className="text-sm text-muted-foreground">Profile and security</div>
    </div>
    <Separator />
    <div>
      <div className="font-medium">Sign out</div>
      <div className="text-sm text-muted-foreground">End the current session</div>
    </div>
  </div>
)
