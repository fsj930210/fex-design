import { Progress, ProgressRange, ProgressTrack } from '@fex-design/solid/primitive/progress'
export default function SegmentedExample() { return <Progress max={100}><ProgressTrack><ProgressRange value={30} /><ProgressRange value={25} offset={30} /><ProgressRange value={15} offset={55} /></ProgressTrack></Progress> }
