import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import ImageComponent from "../../../components/imageComponent/ImageComponent";
import { nftMarketplaceAddress } from "../../../environment/env";
import {
    getBNBRate,
    getEthRate,
    mintNFT,
    unlistNft,
} from "../../../metamask/metamask";
import { marketplaceService } from "../../../services/marketplace.service";
import { selectUser } from "../../../store/auth/selector";
import {
    getMarketplaceBuildingAction,
    getMarketplaceSimilarBuildingsAction,
} from "../../../store/marketplace/async.func";
import { handleModalHide, handleShowModal } from "../../../utils/showModal";
import * as CONSTANTS from "../../../constants";
import DetailShimmer from "../../../components/skelton/DetailShimmer";
import dynamic from "next/dynamic";
import Head from "next/head";
import TextField from '@mui/material/TextField';
import { NFT_TYPES } from "../../../constants/nftType.enum";
import Countdown from "react-countdown";

const MagnifyImage = dynamic(
    () => import("../../../components/MagnifyImage/MagnifyImage"),
    { ssr: false }
);

const platformOwnerAddress = "0xCeBF6573C0B1B239fF233C5debF502842FFC4cFe";

const MarketPlaceDetailModule = () => {
    const [building, setBuilding] = useState<any>(null);







 








    return (
        <div className="container">
            <Head>
                <title>{building?.address || "NFT"} - Gameree</title>
            </Head>
            <div className="gap-4 mt-4">
                <div className="AtGradient rounded-2xl mt-8 h-fit">
                    {/* <div className="w-18 AtBoxInner rounded-2xl duration-800 transition-all overflow-hidden">
                        <MagnifyImage
                        figClassName={` w-10 h-20 md:w-auto md:h-auto vimeo-video-container `}
                        src={building?.image ?? "/assets/images/detail-page.png"}
                        />
                    </div> */}
                    <div className="flex justify-between">

                        <img className="w-[300px] pl-24 pt-12 flex-none" src={building?.image ?? "/assets/images/NFT.jpg"}></img>

                        <div className="text-3xl text-black1 p-2 text-center">
                            <p className="bg-purple text-3xl text-black1">ID</p>
                            <hr className="black1" />
                            <p className="bg-purple text-3xl text-black1">Sale type</p>
                            <hr className="black1" />
                            <p className="bg-purple text-3xl text-black1">Time Left</p>
                            <hr className="black1" />
                            <div className="flex justify-center flex-row">
                                <p className="bg-purple text-3xl text-black1 pr-6">List for sale</p>
                                <button className="border-l-2 pl-6">...</button>
                            </div>
                        </div>
                        <div>
                            <p>Listing price</p>
                            <p>--ETH</p>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <p>Set a price</p>
                        <div className="flex">
                            <TextField
                                id="filled-read-only-input"
                                label="Read Only"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                            <TextField
                                id="filled-read-only-input"
                                label="Read Only"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPlaceDetailModule;
