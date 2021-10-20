export function setUpCanvas(
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
    

){
    const canvas = canvasRef.current;

        //to make typescript happy
        if(canvas){

            const canvasSize = Math.min(window.visualViewport.width, 720)
            //canvas.width = canvasSize * 2;
            //canvas.height = canvasSize * 2;
            
            canvas.width =  1440;
            canvas.height = 1400;

            //canvas.style.width  =  `${canvasSize}px`
            //canvas.style.height = `${canvasSize}px`

            
            

            let context = canvasRef.current?.getContext("2d");
           
            if(context){
                context.scale(2,2)
            }
             contextRef.current = context;



            
        }
        

         
        if(canvasRef.current){
            canvasRef.current.width  = 720 ;
            canvasRef.current.height = 720;
        }
}