import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface GameOverProps {
    winner: string;
    open: boolean | string;
    onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ winner, onRestart, open = false }) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (open) {
            dialog.current?.showModal();
        }
        else {
            dialog.current?.close();
        }
    }, [open]);

    const modalRoot = document.getElementById('root-model') as HTMLElement;
    return (

        createPortal(
            open && <dialog ref={dialog} id="game-over">
                <h2>Game Over!</h2>
                {winner ? <p>{winner.toUpperCase()} won!</p> : <p>It&apos;s a draw!</p>}
                <p>
                    <button onClick={onRestart}>Rematch!</button>
                </p>
            </dialog>,
            modalRoot
        )
    );
};

export default GameOver;

// const GameOverPortal: React.FC<GameOverProps> = forwardRef<HTMLDialogElement, GameOverProps>((props, ref) => {
//     const modalRoot = document.getElementById('root-model');
//     if (!modalRoot) return null; // or provide some fallback

//     return createPortal(<GameOver {...props} ref={ref} />, modalRoot);
// });

// export default GameOverPortal;




// import React, { useRef, forwardRef, useImperativeHandle } from 'react';
// import { createPortal } from 'react-dom';

// interface GameOverProps {
//     winner: string;
//     onRestart: () => void;
// }

// const GameOver: React.FC<GameOverProps> = forwardRef<HTMLDialogElement, GameOverProps>(({ winner, onRestart }, ref) => {
//     const dialog = useRef<HTMLDialogElement>(null);
//     useImperativeHandle(ref, () => ({
//         open() {
//             if (dialog.current) {
//                 dialog.current.showModal();
//             }
//         },
//     }));
//     return (
//         <dialog ref={dialog} id="game-over">
//             <h2>Game Over!</h2>
//             {winner ? <p>{winner.toUpperCase()} won!</p> : <p>It&apos;s a draw!</p>}
//             <p>
//                 <button onClick={onRestart}>Rematch!</button>
//             </p>
//         </dialog>
//     );
// });

// const GameOverPortal: React.FC<GameOverProps> = forwardRef<HTMLDialogElement, GameOverProps>((props, ref) => {
//     const modalRoot = document.getElementById('root-model');
//     if (!modalRoot) return null; // or provide some fallback

//     return createPortal(<GameOver {...props} ref={ref} />, modalRoot);
// });

// export default GameOverPortal;

