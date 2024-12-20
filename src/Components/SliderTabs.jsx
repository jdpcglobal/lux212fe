import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { callPostApiWithoutPayload, callPostApi } from './ApiCaller';
import * as ApiConst from './ApiConst';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Cookies from 'universal-cookie';
import { Get_Providers_Post } from './ApiConst';
import { Link } from 'react-router-dom'
import Loader from "./common/Loader";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SliderTabs = ({ width }) => {

    const [tabIndex, setTabIndex] = useState(0);
    const [tabpanelData, setTabpanelData] = useState([])
    const [tabsData, setTabsData] = useState([])
    const [loadingTabs, setLoadingTabs] = useState(false)
    const [AdsData, setAdsData] = useState([])
    const loggedInUser = new Cookies().get("kisDiamond_LoggedIn")
    const [gameLoader, setGameLoader] = useState(false);
    const [gameLoaders, setGameLoaders] = useState(false);
    const [icon, setIcons] = useState(false)
    const [icon2, setIcons2] = useState(true)
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const [launchGameReqObj, setLaunchGameReqObj] = useState({
        TCode: "",
        PCode: "",
        GCode: "",
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    })

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    //***** SLIDER API *****/
    useEffect(() => {
        ADS();
        getADSLists();
    }, []);

    const ADS = async () => {
        try {
            callPostApiWithoutPayload(ApiConst.ADS_Post, (response) => {
                if (response.isSuccess) {
                    var options = [];
                    const adContents = response.data.filter((x) => x.Type === 1);
                    if (adContents.length > 0) {
                        adContents.map((data, i) => {
                            options = [...options, ...data.AdContents]
                        })
                    }
                    setAdsData(options)
                }
            },)
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const getADSLists = () => {
    }
    //***** SLIDER API END *****/

    // ***** GET GAME TYPES API *****
    useEffect(() => {
        setLoadingTabs(true)
        fetchData();
        getGamesList();
    }, []);

    const fetchData = async () => {
        try {
            callPostApiWithoutPayload(ApiConst.Get_Game_Types_Post, (jsonData) => {
                if (jsonData.isSuccess) {
                    setTabsData(jsonData.data)
                    // getInitialGameProviders();
                    getTabPanelData(0);
                    setLoadingTabs(false)
                    setGameLoaders(true)
                }
            }, (error) => {
            })
        } catch (error) {
            // console.log('Error:', error);
        }
    };

    const getGamesList = () => {

    }
    // ***** GET GAME TYPES END *****


    //*****GET PROVIDERS API *****/
    const handleTabSelect = (index) => {
        getTabPanelData(index)
        setTabIndex(index)
        setGameLoader(true)
    }

    const getTabPanelData = async (i) => {
        let formData = new FormData();
        formData.append('TCode', `${i + 1}`);
        callPostApi(Get_Providers_Post, formData, (jsonData) => {
            if (jsonData.data?.isSuccess) {
                setTabpanelData(jsonData.data.data)
                const tabPanelData = jsonData.data.data;
                if (tabPanelData.length !== 0) {
                    setLaunchGameReqObj({
                        ...launchGameReqObj,
                        PCode: tabPanelData[0].GameTypeCode,
                        TCode: tabPanelData[0].Code,
                    })
                }
            }
            setGameLoader(false)
            setGameLoaders(false)
            //console.log('5555', new Cookies().get("kisDiamond_LoggedIn")?.Token)
            if (new Cookies().get("kisDiamond_LoggedIn")?.Token === undefined) {
                console.log('Jai shree Ram');
                setIcons(true);
                setIcons2(false);
            } else {
                console.log('Jai Hanuman');
                setIcons(false);
                setIcons2(true);
            }

        },
            (error) => {
                setGameLoader(false)
                setGameLoaders(false)
            }
        );

    }
    //***** GET PROVIDER API END *****

    const ReloadPAge = async => {
        window.location.reload();
    }


    return (
        <>
            {/* END PAGE CONTENT */}

            <section className="pcview">
                <div className="page-content header-clear-medium">
                    <div
                        className="splide single-slider slider-no-dots slider-no-arrows slider-boxed text-center mt-n1 splide--loop splide--ltr splide--draggable is-active"
                        id="mobilebanner"
                        style={{ visibility: "visible" }}
                    >
                        <Slider {...settings}>
                            {AdsData.length > 0 && AdsData.map((data, i) => (
                                <>
                                    <div className="banner w-100">
                                        <div className="splide__slide is-active is-visible">
                                            <div
                                                className="card card-style mx-0 shadow-card shadow-card-m sliderImage"
                                                data-card-height={300}
                                                style={{
                                                    backgroundImage: `url(${data.Url})`,

                                                }}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </Slider>
                    </div>

                    {/* slider */}

                    <div className="content mx-3 mt-0" id="mobilediv">

                        <div className="row">
                            {/* end category app */}
                            {/* category pc */}
                            <div className="col-md-12 m-auto catslider_pc" style={{ padding: 0 }}>
                                {/*<div class="profile-tabs">*/}
                                <div className="splide slider-no-dots slider-no-arrows slider-visible-center text-center splide--slide splide--ltr splide--draggable is-active" id="category-pc" style={{ visibility: 'visible' }}>
                                    <div className="splide__track" style={{ borderBottom: 'solid 1px rgba(0, 0, 0, 0.07)' }} id="category-pc-track">
                                        <div className="splide__list" id="category-pc-list" style={{ transform: 'translateX(0px)' }}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="Tabs" style={{ cursor: 'pointer', borderRadius: '15px' }}>
                                <Tabs selectedIndex={tabIndex} onSelect={(index) => handleTabSelect(index)}>
                                    <div className="get TabPanel" style={{ marginTop: '7px' }}>
                                        <TabList>
                                            {tabsData.length > 0 && tabsData.map((games) =>
                                                <>
                                                    <Tab>{games.Description}</Tab>
                                                </>
                                            )}
                                        </TabList>
                                    </div>
                                </Tabs>
                            </div>
                            {/* end category pc */}
                        </div>
                        <div className="mt-3"></div>
                        <div className="row row-cols-3 row-cols-md-6" style={{ justifyContent: "center" }}>

                            {/* KING855 */}
                            <>

                                {icon2 &&
                                    <>
                                        {gameLoaders ? <Loader width={600} /> :
                                            <>
                                                {tabpanelData.map((data, i) =>
                                                    <div className="col-3 p-1 game-item livecasino allgame" style={{ cursor: 'pointer' }} key={i}>
                                                        <Link to={`/PlayGame/${data.GameTypeCode}/${data.Code}`}>
                                                            <div className="card card-style rounded-s m-0" style={{ height: '100%' }}>
                                                                {gameLoader ? <Loader width={120} /> :
                                                                    <img
                                                                        style={{ height: '100%', width: '100%' }}
                                                                        className="lazyload cursor"
                                                                        data-src="./imagies/live_855.jpg"
                                                                        src={data.ImageUrl || 'https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-5-season-2-myths-and-mortals-thumbnail-576x576-53c0a1db8297.jpg'}
                                                                        alt=""
                                                                        onError={(e) => {
                                                                            e.target.onerror = null; // Prevent infinite loop if default image also fails to load
                                                                            e.target.src = 'https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-5-season-2-myths-and-mortals-thumbnail-576x576-53c0a1db8297.jpg'; // Set default image URL
                                                                        }}
                                                                    // Make sure action_live is defined
                                                                    />
                                                                }
                                                                <div className="game-title">{data.Name}</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </>
                                        }
                                    </>
                                }

                                {icon &&
                                    <>
                                        {gameLoaders ? <Loader width={600} /> :
                                            <>
                                                {tabpanelData.map((data, i) =>
                                                    <div className="col-3 p-1 game-item livecasino allgame" style={{ cursor: 'pointer' }} key={i}>

                                                        <div onClick={toggleModal} className="card card-style rounded-s m-0" style={{ height: '100%' }}>
                                                            {gameLoader ? <Loader width={120} /> :
                                                                <img
                                                                    style={{ height: '100%', width: '100%' }}
                                                                    className="lazyload cursor"
                                                                    data-src="./imagies/live_855.jpg"
                                                                    src={data.ImageUrl || 'https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-5-season-2-myths-and-mortals-thumbnail-576x576-53c0a1db8297.jpg'}
                                                                    alt=""
                                                                    onError={(e) => {
                                                                        e.target.onerror = null; // Prevent infinite loop if default image also fails to load
                                                                        e.target.src = 'https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-5-season-2-myths-and-mortals-thumbnail-576x576-53c0a1db8297.jpg'; // Set default image URL
                                                                    }}
                                                                // Make sure action_live is defined
                                                                />
                                                            }
                                                            <div className="game-title">{data.Name}</div>
                                                        </div>

                                                    </div>
                                                )}
                                            </>
                                        }
                                    </>
                                }

                            </>
                            <Modal style={{ marginTop: '80px' }} show={showModal} onHide={toggleModal}>
                                <Modal.Body className='ModalBody' style={{fontSize:'23px', fontWeight:'900', color:'black', textAlign:'center'}}>Please Login for play Games.
                                    <div className='mAnchor mt-2 ' style={{color:'white'}}>
                                    <Button variant="primary" onClick={ReloadPAge}>Login</Button>
                                    </div>
                                </Modal.Body>
                            </Modal>
                            {/* end KING855 */}

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default SliderTabs
