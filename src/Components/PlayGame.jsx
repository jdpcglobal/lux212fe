import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import Loader from "./common/Loader";
import { callPostApi } from './ApiCaller';
import { GetGames_Post } from './ApiConst';
import { Link } from 'react-router-dom';


const PlayGame = ({ width }) => {
    const { tCode, pCode } = useParams();
    //console.log("Tcode+++", pCode)
    const [launchGameData, setLaunchGameData] = useState([]);
    const [gameLoaders, setGameLoaders] = useState(false);
    const [gameLoaders2, setGameLoaders2] = useState(true);
    const [gameFlim, setGameFlim] = useState(true)
    const [clickedImage, setClickedImage] = useState(null);
    const [responseData, setResponseData] = useState([]);
    const [gameMessage, setGameMessage] = useState('')
    const [messageContent, setMessageContent] = useState(false)
    const [launchGameReqObj, setLaunchGameReqObj] = useState({
        TCode: "",
        PCode: "",
        GCode: "",
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    })

    const str = gameMessage;
    const startIndex = str.indexOf('ErrorMessage') + 'ErrorMessage'.length + 3;
    const endIndex = str.lastIndexOf('"');
    const errorMessage = str.substring(startIndex, endIndex);

    useEffect(() => {
        GetGames(tCode, pCode);
        setGameLoaders(true)
    }, [tCode, pCode]);

    const GetGames = async (tCode, pCode) => {
        let formData = new FormData();
        formData.append('TCode', tCode);
        formData.append('PCode', pCode);
        callPostApi(GetGames_Post, formData, (jsonData) => {
            // const messageObj2 = JSON.parse(messageObj);
            setGameMessage(jsonData.data.message);
            setGameLoaders(false);
            if (jsonData.data?.isSuccess) {
                setResponseData(jsonData.data.data);

            } else {
                setMessageContent(true)
            }
        },
            (error) => {
                setGameLoaders(false)
                // console.log('Error:', error);
            }
        );

    };
    //***** GET GAME API END *****/

    //***** GET LaunchGame API  *****/

    const handleGameClick = (gCode) => {
        let reqObj = {
            ...launchGameReqObj,
            GCode: gCode,
        }
        LaunchGame(reqObj);
        setClickedImage(gCode);
    };

    const LaunchGame = async (reqObj) => {
        let formData = new FormData();
        formData.append('TCode', tCode);
        formData.append('PCode', pCode);
        formData.append('GCode', reqObj?.GCode);
        formData.append('Token', reqObj?.Token);

        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/LaunchGame', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                let a = document.createElement('a');
                a.target = '_blank';
                a.href = jsonData.data;
                a.click();
                setClickedImage(false);
                // console.log();
                setLaunchGameData(jsonData.data);
            } else {
                window.location.reload();
            }

        } catch (error) {
            console.log('Error:', error);
        }
    };
    //***** GET LaunchGame API END *****/

    const goBack = () => {
        window.history.back();
    };

    // console.log('1111111111222222',gameMessage)
    return (
        <>
            <section className="pcview" >
                <div className="page-content header-clear-medium">
                    <div
                        className="splide single-slider slider-no-dots slider-no-arrows slider-boxed text-center mt-n1 splide--loop splide--ltr splide--draggable is-active"
                        id="mobilebanner"
                        style={{ visibility: "visible" }}
                    >
                        <div style={{ textAlign: "left", cursor: 'pointer', width: '50px' }}>
                            <span className='BackButton'>
                                <img onClick={goBack} width="54" height="54" src="https://img.icons8.com/sf-black-filled/64/circled-left-2.png" alt="circled-left-2" />
                            </span>
                        </div>
                    </div>

                    {/* slider */}

                    <div className="content mx-3 mt-0" id="mobilediv">

                        {messageContent &&
                            <div className='container' style={{ textAlign: 'center', color: 'black', fontSize: '25px', fontWeight: "800", marginTop: '50px' }}>
                                <div className="row">
                                    <div className="col-12">
                                        <div>
                                            {errorMessage}
                                        </div>
                                        <img style={{ marginTop: '50px', height: '250px' }} src="https://static.wixstatic.com/media/46eb04_4748a9498f6d4702ae3b7aca832ad64a~mv2.png/v1/fill/w_560,h_396,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/website_under_maintenance.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="mt-3"></div>
                        <div className="row row-cols-3 row-cols-md-6 PlayGameLoader">
                        {gameLoaders ? <Loader width={200} /> :
                            <>
                                {responseData.length > 0 && responseData.map((data) =>
                                    <div className="col-3 p-1 game-item livecasino allgame" style={{ cursor: 'pointer', position: 'relative' }} key={data.GameCode}>
                                        <div className="card card-style rounded-s m-0" style={{ height: '100%' }}>
                                            <img onClick={() => handleGameClick(data.GameCode)}
                                                style={{ height: '100%' }}
                                                className="lazyload cursor"
                                                data-src="./imagies/live_855.jpg"
                                                src={data.ImageURL}
                                                alt=""
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://www.shutterstock.com/image-vector/slot-single-flat-icon-on-260nw-287826776.jpg';
                                                }}
                                            />
                                            <div className="game-title">{data.GameName}</div>
                                        </div>

                                        {clickedImage === data.GameCode &&
                                            <div className='logoFlim' style={{display:'flex', justifyContent:'center'}}>
                                                {gameLoaders2 ? <Loader width={90} /> :
                                                    <div className="ghyjn"></div>
                                                }
                                            </div>
                                        }
                                    </div>
                                )}
                            </>
}
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default PlayGame
