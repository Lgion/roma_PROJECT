import dynamic from 'next/dynamic';
import ExpandCollapse from './components/ExpandCollapse';

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
    </main>
  );
}
