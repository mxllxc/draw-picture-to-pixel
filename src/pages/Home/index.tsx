import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../shared/context/auth";
import { Header } from "../../components/header";

const Home: React.FC = () => {
    const { img } = useContext(AuthContext)
    const divRef = useRef<HTMLDivElement>(null);
    const cellSize = 10; // Tamanho da célula

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            const row = Math.floor(offsetY / cellSize);
            const col = Math.floor(offsetX / cellSize);
            const square = document.createElement("div");
            square.className = "square";
            square.style.position = "absolute";
            square.style.width = `${cellSize}px`;
            square.style.height = `${cellSize}px`;
            square.style.backgroundColor = "white"; // Cor do quadrado
            square.style.left = col * cellSize + "px";
            square.style.top = row * cellSize + "px";
            divRef.current.appendChild(square);
        }
    };

    const handleLimparQuadrados = () => {
        if (divRef.current) {
            const squares = divRef.current.querySelectorAll(".square");
            squares.forEach(square => square.remove()); // Remove apenas os elementos com a classe "square"
        }
    };

    return (
        <div>
            <Header />
            <div className="w-full justify-center py-6 flex flex-row gap-10">
                <div className="relative" ref={divRef}>
                    <img className="opacity-50 max-w-[90vw]" src={img} alt="Imagem" />
                    <div className="absolute top-0 border-white border flex flex-wrap w-full h-full" onClick={handleClick} />
                </div>
                <div className="flex flex-col gap-3">
                    <button className="btn btn-primary text-white" onClick={handleLimparQuadrados}>Limpar</button>
                </div>
            </div>
        </div>
    )
}

export default Home;