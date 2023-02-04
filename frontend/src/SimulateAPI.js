export default class SimulateAPI {

    constructor(serviceAddress) {
        this.serviceAddress = serviceAddress;
    }

    makeURL(iter, temp, free, start, target, grid, steps, 
            J, JD, JAB, JA, JB, JDA, JDB, cell){
        const source =  iter + "/" + steps + "/" + temp + "/" + free + "/" + start + "/" 
                        + target + "/" + grid + "/" + J + "/" + JD + "/" + JAB + "/" 
                        + JA + "/" + JB + "/" + JDA + "/" + JDB + "/" + cell;
        return new URL(source, this.serviceAddress);
    }

    download = (content, fileName, contentType)=>{
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
      }

    async calculate(iter, steps, temp, free, start, target, grid, 
                    J, JD, JAB, JA, JB, JDA, JDB, cell, handlerG, 
                    handlerM, handlerE, handlerS, handlerSH, handlerT){
        const source = iter + "_" + steps + "_" + temp + "_" + free + "_" + start 
                        + "_" + target + "_" + grid + "_" + J + "_" + JD + "_" + JAB + "_" 
                        + JA + "_" + JB + "_" + JDA + "_" + JDB + "_" + cell;
        try{
            await fetch( this.makeURL(iter, temp, free, start, target, grid, 
                                      steps, J, JD, JAB, JA, JB, JDA, JDB, cell))
            .then( res=>res.json() )
            .then(  async (response)=>{
                handlerG(response["grids"])
                handlerM(response["mag"])
                handlerE(response["energy"])
                handlerS(response["sus"])
                handlerSH(response["sh"])
                handlerT(response["temperature"])
                this.download(JSON.stringify(response), source+".json", "text/plain");
            })
        } catch(error){
            console.log(error)
        }
    }
}
