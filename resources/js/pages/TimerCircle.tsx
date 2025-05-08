import BootstrapLayout from "@/layouts/BootstrapLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function TimerCircle() {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [activeColor, setActiveColor] = useState("green");

    // ตัวจับเวลา
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    // ฟังก์ชันควบคุม
    const startTimer = () => {
        setIsRunning(true);
        setActiveColor("green");
    };

    const stopTimer = () => {
        setIsRunning(false);
        setActiveColor("red");
    };

    const resetTimer = () => {
        setIsRunning(false);
        setCount(0);
        setActiveColor("gray");
    };

    return (
        <BootstrapLayout>
            <Head title="Timer with Circles" />
            <div className="container mt-4">
                <h1>Timer with Circles</h1>
                <h2 className="text-center display-4 mb-4">{count} วินาที</h2>
                
                <div className="row justify-content-center">
                    {/* ปุ่มวงกลม 3 ปุ่ม */}
                    {[
                        { action: startTimer, color: "green", text: "เริ่ม" },
                        { action: stopTimer, color: "red", text: "หยุด" },
                        { action: resetTimer, color: "gray", text: "รีเซ็ต" }
                    ].map((btn, index) => (
                        <div className="col-auto mb-3" key={index}>
                            <button 
                                onClick={btn.action}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    backgroundColor: activeColor === btn.color ? btn.color : "white",
                                    color: activeColor === btn.color ? "white" : "black",
                                    border: `2px solid ${btn.color}`,
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold'
                                }}
                                className="shadow-sm"
                            >
                                {btn.text}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </BootstrapLayout>
    );
}