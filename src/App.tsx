import './App.css';
import { ToastManager } from 'features';

function App() {
  const toasts = [
    {
      message: "Равным образом реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития. Значимость этих проблем настолько очевидна",
      status: "warning" as const,
      category: "hello"
    },
    {
      message: "message 2",
      status: "error" as const,
      category: "world"
    },
    {
      message: "message 3",
      status: "error" as const,
      category: "world"
    },
    {
      message: "message 4",
      status: "success" as const,
      category: "hello"
    },
    {
      message: "message 5",
      status: "warning" as const,
      category: "hello"
    },
    {
      message: "Равным образом реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития. Значимость этих проблем настолько очевидна",
      status: "error" as const,
      category: "world"
    },
  ]
  return (
    <div className="App">
      <ToastManager toasts={toasts}/>
    </div>
  );
}

export default App;
