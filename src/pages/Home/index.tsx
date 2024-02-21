import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../shared/context/auth";
import { Header } from "../../components/header";

const Home: React.FC = () => {
    const { img } = useContext(AuthContext)
    const divRef = useRef<HTMLDivElement>(null);
    const cellSize = 10; // Tamanho da célula

    const [squares, setSquares] = useState<HTMLElement[]>([]);
    const [color, setColor] = useState<string>("#fff");
    const [pencil, setPencil] = useState<boolean>(true);

    useEffect(() => {
        setSquares([]); // Limpa os quadrados quando a imagem é alterada
    }, [img]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (divRef.current && pencil) {
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
            square.style.backgroundColor = color; // Cor do quadrado
            square.style.left = col * cellSize + "px";
            square.style.top = row * cellSize + "px";
            square.addEventListener("click", handleDelete); // Adicionando evento de clique ao quadrado
            divRef.current.appendChild(square);
            setSquares(prevSquares => [...prevSquares, square]); // Adiciona o quadrado ao estado
        }
    };

    const handleDelete = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains("square")) {
            target.remove(); // Remover a célula ao clicar nela
            setSquares(prevSquares => prevSquares.filter(square => square !== target)); // Remove o quadrado do estado
        }
    };

    const handleLimparQuadrados = () => {
        if (divRef.current) {
            const squares = divRef.current.querySelectorAll(".square");
            squares.forEach(square => square.remove()); // Remove apenas os elementos com a classe "square"
            setSquares([]); // Limpa o estado
        }
    };

    const handleUndo = () => {
        const lastSquare = squares.pop(); // Retira o último quadrado do estado
        if (lastSquare) {
            lastSquare.remove(); // Remove o último quadrado
        }
    };

    return (
        <div>
            <Header />
            <div className="w-full justify-center py-6 flex flex-row gap-10">
                {img && (
                    <>
                        <div className="relative" ref={divRef}>
                            <img className="opacity-50 max-w-[80vw]" src={img} alt="Imagem" />
                            <div className="absolute top-0 border-white border cursor-crosshair flex flex-wrap w-full h-full" onClick={(event) => {
                                if(pencil) {
                                    handleClick(event)
                                }
                            }} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2">
                                <i className="ri-edit-line"></i>
                                <input onChange={() => setPencil(!pencil)} checked={pencil} type="radio" />
                                <i className="ri-eraser-fill"></i>
                                <input onChange={() => setPencil(!pencil)} checked={!pencil} type="radio" />
                            </div>
                            <div className="flex gap-2">
                                <span>Escolha a cor:</span>
                                <input defaultValue="white" onChange={(event) => setColor(event.target.value)} type="color" />
                            </div>
                            <button className="btn btn-primary text-white" onClick={handleLimparQuadrados}>Limpar</button>
                            <button className="btn btn-primary text-white" onClick={handleUndo}>Desfazer</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Home;