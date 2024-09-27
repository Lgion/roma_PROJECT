import dynamic from 'next/dynamic';
import ExpandCollapse from './components/ExpandCollapse';
import {Button} from "./components/shadcn/ui/button"
import MultistepForm from "./components/shadcn/MultistepForm"


const MapComponent = dynamic(() => import('./components/MapComponent'), {
  ssr: false
});

export default function Home() {

  return (
    <main>
      <div className="map-container">
        <MapComponent />
      </div>
      <ExpandCollapse />

      <Button variant="outline">Button</Button>
      
      <MultistepForm />
    </main>
  );
}
