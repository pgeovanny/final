import Stepper from '../components/Stepper';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Resumidor de Lei Inteligente</h1>
      <Stepper />
    </div>
  );
}
