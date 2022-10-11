export default class NavigatorHelper {
    static getLocation(): Promise<any> {
        let opcion: any = {
            timeOut: 1
        }
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(pos => {
                resolve(pos);
                //console.log('Respuesta: ', pos);
            },
                err => {
                    reject(err);
                    //console.log('Error: ', err)
                }
            );
        })

    }

    static getLocationC( success : (key : any) => void, error : (key : any) => void){
        navigator.geolocation.getCurrentPosition(
        pos => {
            success(pos);
        },
        err => {
            error(err);
        });
    }

    static startRecord( video : HTMLVideoElement, btn : HTMLElement){
        navigator.mediaDevices.getUserMedia({
            video : {
                width : 800,
                height : 600
            },
            //audio : true
        }).then(media => {
            console.log(media);
            video.srcObject = media;
            video.onloadedmetadata = res => {
                video.play();
                let data : any[] = []
                const recorder = new MediaRecorder( media, {
                    mimeType : 'video/webm'
                });
                recorder.ondataavailable = eve => {
                    console.log('On Data Available...')
                    data.push(eve.data);
                },
                recorder.onstop = () => 
                {
                    console.log('On Stop...')
                    const blob = new Blob(data, {
                        type : 'video/webm'
                    });
                    /*const reader = new FileReader();
                    reader.readAsDataURL;
                    reader.onloadend = () => {
                        console.log('Result',reader.result);
                    }*/
                    const url = URL.createObjectURL(blob);
                    const elA = document.createElement("a");
                    document.body.appendChild(elA);
                    elA.href = url;
                    elA.download = "video.webm";
                    elA.click();
                    console.log(URL.createObjectURL(blob));
                    
                },
                setTimeout(() => {
                    console.log('To Start...')
                    recorder.start();
                }, 10);
                btn.addEventListener('click', () =>{
                    console.log('To Stop...')
                    recorder.stop();
                })
                
            }
        })
    }

}