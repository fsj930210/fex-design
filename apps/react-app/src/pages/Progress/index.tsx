import { useState } from "react";
import { MinusIcon } from "@fex-design/react/icons/minus";
import { PlusIcon } from "@fex-design/react/icons/plus";
import { Button } from "@fex-design/react/ui/button";
import { Card } from "@fex-design/react/ui/card";
import { Progress } from "@fex-design/react/ui/progress";

const gradient = {
  from: "#1677ff",
  to: "#87d068",
};

const segmentGradient = {
  stops: {
    "0%": "#1677ff",
    "50%": "#1677ff",
    "50.01%": "#52c41a",
    "100%": "#52c41a",
  },
};

export default function ProgressPage() {
  const [value, setValue] = useState(50);
  const increase = () => setValue((prev) => Math.min(100, prev + 10));
  const decrease = () => setValue((prev) => Math.max(0, prev - 10));

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Progress</h1>
        <p className="text-muted-foreground">
          展示操作的当前进度，或显示任务完成的百分比。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="Basic" className="p-4">
          <div className="grid gap-4">
            <Progress label="Upload progress" value={35} infoPlacement="top" />
            <Progress label="Task completion" value={70} infoPlacement="top" />
          </div>
        </Card>

        <Card title="Format & info placement" className="p-4">
          <div className="grid gap-4">
            <Progress
              label="Storage used"
              value={72}
              infoPlacement="top"
              format={(percent) => `${percent ?? 0} / 100 GB`}
            />
            <Progress label="Processing" value={48} infoPlacement="inside" showInfo />
            <Progress label="Review" value={84} infoPlacement="bottom" showInfo />
          </div>
        </Card>

        <Card title="Status" className="p-4">
          <div className="grid gap-4">
            <Progress value={0} status="pending" />
            <Progress value={50} status="active" />
            <Progress value={70} status="active" />
            <Progress value={100} status="success" />
            <Progress value={60} status="error" />
          </div>
        </Card>

        <Card title="Color" className="p-4">
          <div className="grid gap-4">
            <Progress value={65} color="#7c3aed" />
            <Progress value={80} color="#059669" trackColor="#cffafe" />
            <Progress value={90} color={gradient} />
          </div>
        </Card>

        <Card title="Segmented" className="p-4">
          <div className="grid gap-4">
            <Progress value={70} color={segmentGradient} />
            <div className="flex items-center justify-around">
              <Progress variant="circle" value={70} size={96} color={segmentGradient} showValue />
              <Progress variant="dashboard" value={70} size={96} color={segmentGradient} showValue />
            </div>
          </div>
        </Card>

        <Card title="Step Line" className="p-4">
          <div className="grid gap-4">
            <Progress value={50} steps={5} color="var(--info)" />
            <Progress value={80} steps={5} color="var(--info)" success />
            <Progress value={100} steps={5} color="var(--info)" success />
          </div>
        </Card>

        <Card title="Step Circle" className="p-4">
          <div className="flex items-center justify-around">
            <Progress variant="circle" value={50} steps={10} gap={2} color="var(--info)" showValue />
            <Progress variant="circle" value={80} steps={10} gap={2} color="var(--info)" showValue />
            <Progress variant="circle" value={100} steps={10} gap={2} color="var(--info)" success />
          </div>
        </Card>

        <Card title="Size" className="p-4">
          <div className="grid gap-4">
            <Progress value={50} thickness={4} />
            <Progress value={50} thickness={8} />
            <Progress value={50} thickness={12} />
          </div>
        </Card>

        <Card title="Linecap" className="p-4">
          <div className="grid gap-4">
            <Progress value={50} linecap="round" thickness={8} />
            <Progress value={50} linecap="butt" thickness={8} />
            <Progress value={50} linecap="square" thickness={8} />
          </div>
        </Card>

        <Card title="Circle" className="p-4">
          <div className="flex flex-wrap items-center justify-around gap-4">
            <Progress variant="circle" value={75} size={96} thickness={8} status="active" showValue />
            <Progress variant="circle" value={70} size={96} thickness={8} status="error" showValue />
            <Progress variant="circle" value={100} size={96} thickness={8} status="success" showValue />
          </div>
        </Card>

        <Card title="Dashboard" className="p-4">
          <div className="flex items-center justify-around">
            <Progress variant="dashboard" value={70} size={96} thickness={8} gapDegree={90} gapPlacement="bottom" showValue />
            <Progress variant="dashboard" value={70} size={96} thickness={8} gapDegree={90} gapPlacement="top" showValue />
          </div>
        </Card>

        <Card title="RTL / LTR" className="p-4">
          <div className="grid gap-4">
            <div dir="ltr">
              <Progress label="LTR direction" value={65} infoPlacement="top" />
            </div>
            <div dir="rtl">
              <Progress label="RTL direction" value={65} infoPlacement="top" />
            </div>
          </div>
        </Card>

        <Card title="Structured composition" className="p-4">
          <Progress
            label="Upload"
            value={72}
            status="active"
            infoPlacement="top"
            classNames={{ root: "grid gap-2", label: "font-medium", info: "text-primary" }}
            styles={{ range: { background: "linear-gradient(90deg, #6366f1, #a855f7)" } }}
          />
        </Card>

        <Card title="Dynamic value" className="p-4">
          <div className="grid gap-4">
            <Progress value={value} />
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={decrease}>
                <MinusIcon className="size-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={increase}>
                <PlusIcon className="size-4" />
              </Button>
              <span className="text-sm text-muted-foreground">{value}%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
