// import React, { useEffect, useState } from "react";
// import Button from "../../../components/button/Button";
// import Switch from '@mui/material/Switch';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Image from 'next/image'


// const SaleModule: React.FC = () => {
//     const [checked1, setChecked1] = React.useState(true);
//     const [checked2, setChecked2] = React.useState(true);
//     const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setChecked1(event.target.checked);
//     };
//     const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setChecked2(event.target.checked);
//     };

//     return (
//         <div>
//             <div className=" mt-20 flex flex-col items-center justify-center w-full">

//                 <form className="md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2">
//                     <div>
//                         <label className="text-white font-bold mb-2">Upload file*</label>
//                         <input className="w-64 sm:w-96 md:w-1/2 lg:w-3/4 xl:w-5/6 2xl:w-10/12 bg-transparent w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer block text-white" id="file_input" type="file" />
//                     </div>
//                     <div className="mt-9">
//                         <label className="text-white font-bold mb-2 text-sm">Categories</label>
//                     </div>
//                     <input className="w-64 sm:w-96 md:w-1/2 lg:w-3/4 xl:w-5/6 2xl:w-10/12 h-10 bg-transparent border rounded"></input>
//                     <div className="mb-2 mt-9">
//                         <label className="mt-9 text-white font-bold mb-2 text-lg">Item details</label>

//                     </div>

//                     <div className="mt-9">

//                         <label className="mt-9 text-white font-bold mb-2 text-sm">Item Name</label>
//                     </div>
//                     <input placeholder='' className="w-64 sm:w-96 md:w-1/2 lg:w-3/4 xl:w-5/6 2xl:w-10/12 h-10 bg-transparent border rounded"></input>
//                     <div className="mt-9">
//                         <label className="mt-9 text-white font-bold mb-2 text-sm">Description</label>
//                     </div>
//                     <textarea className="w-64 sm:w-96 md:w-1/2 lg:w-3/4 xl:w-5/6 2xl:w-10/12 h-10 h-24 bg-transparent border rounded"></textarea>

//                     <div className="mt-9">

//                         <label className="text-white font-bold mb-2 text-sm">Royalties</label>
//                     </div>

//                     <input placeholder='' className="w-64 sm:w-96 md:w-1/2 lg:w-3/4 xl:w-5/6 2xl:w-10/12 h-10 bg-transparent border rounded"></input>


//                     <div className="mt-9 flex flex-row justify-between w-64 sm:w-96 md:w-1/2 lg:w-3/4 xl:w-5/6 2xl:w-10/12">
//                         <label className="text-white font-bold mb-2 text-sm">Timed auction</label>
//                         <Switch
//                             checked={checked1}
//                             onChange={handleChange1}
//                             inputProps={{ 'aria-label': 'controlled' }}
//                         />
//                     </div>
//                     <div className="mt-9 flex flex-row justify-between w-64 sm:w-96 md:w-1/2 lg:w-3/4 xl:w-5/6 2xl:w-10/12">
//                         <div className="flex flex-col">
//                             <label className="text-white font-bold text-md">Unlock once purchased</label>
//                             <label className="text-white text-gray-200 mb-2 text-sm">Content will be unlocked after successful transaction</label>
//                         </div>
//                         <Switch
//                             checked={checked2}
//                             onChange={handleChange2}
//                             inputProps={{ 'aria-label': 'controlled' }}
//                         />
//                     </div>
//                     <div className="mt-9">
//                         <label className="text-white font-bold text-md">Choose Collection</label>
//                     </div>
//                     <FormControl className="white text-white">
//                         <RadioGroup
//                             row
//                             aria-labelledby="demo-row-radio-buttons-group-label"
//                             name="row-radio-buttons-group"
//                             className="white"
//                         >
//                             <FormControlLabel color="success" value="ERC-721" control={<Radio />} label="ERC-721" />
//                             <FormControlLabel color="default" value="NFT" control={<Radio />} label="NFT" />

//                         </RadioGroup>
//                     </FormControl>

//                     <div className="flex justify-center mt-3">

//                         <Button>CREATE CONTRACT</Button>
//                     </div>
//                 </form>

//             </div>

//     )
// }




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
import { NFT_TYPES } from "../../../constants/nftType.enum";
import Countdown from "react-countdown";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';



// const MagnifyImage = dynamic(
//     () => import("../../../components/MagnifyImage/MagnifyImage"),
//     { ssr: false }
// );
// const platformOwnerAddress = "0xCeBF6573C0B1B239fF233C5debF502842FFC4cFe";








const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};













const MarketPlaceDetailModule = () => {
    const [building, setBuilding] = useState<any>(null);
    const [quickListModal, setQuickListModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);

    const handleQuickListModalOpen = () => {
        setQuickListModal(true);
    }

    const handleQuickListModalClose = () => {
        setQuickListModal(false);
    }

    const handleApproveModalOpen = () => {
        setApproveModal(true);
    }

    const handleApproveModalClose = () => {
        setApproveModal(false);
        setQuickListModal(false);
    }

    const router = useRouter();
    const onClickNft = () => {
        router.push(`/sale/56786`);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    function ChildModal() {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
    
        return (
            <React.Fragment>
                <div className="flex justify-center mt-6">
    
                <Button onClick={handleApproveModalOpen} className="center">Complete listing</Button>
                </div>
                <Modal
                    open={approveModal}
                    onClose={handleApproveModalClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 620 }} className="AtGradient rounded-2xl">
                        <h2 id="child-modal-title" className="text-white text-5xl mb-3 tracking-wide">Approve Collection</h2>
                        <hr />
                        <p id="child-modal-description" className="text-black text-3xl m-12">
                            301-309 Oxford St, London W1D 1NB, UK
                        </p>
                        <hr className="mb-3" />
                        <a className="font-semibold text-2xl" href="#">Go to your Wallet</a>
                        <p className="text-2xl text-black mt-3">You'll be asked to approve this collection from your wallet. You only need to approve each collection once.</p>
                        <div className="flex justify-end">
                            <Button onClick={handleApproveModalClose} className="mt-5">Approve</Button>
                        </div>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }

    return (
        <div className="container">
            <Head>
                <title>{building?.address || "NFT"} - Gameree</title>
            </Head>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v, i) =>
                    <div
                        className="AtGradient rounded-2xl mt-8 h-fit"
                    >
                        {/* <div className="w-18 AtBoxInner rounded-2xl duration-800 transition-all overflow-hidden">
                        <MagnifyImage
                        figClassName={` w-10 h-20 md:w-auto md:h-auto vimeo-video-container `}
                        src={building?.image ?? "/assets/images/detail-page.png"}
                        />
                    </div> */}
                        <div>
                            <button className="w-full" onClick={handleQuickListModalOpen}>
                                <img className="w-full" src={building?.image ?? "/assets/images/NFT.jpg"}></img>
                            </button>
                            <div className="text-3xl text-black1 p-2 text-center">
                                <p className="bg-purple text-3xl text-black1">ID</p>
                                <hr className="black1" />
                                {/* <p className="bg-purple text-3xl text-black1">Sale type</p>
                                <hr className="black1" /> */}
                                <p className="bg-purple text-3xl text-black1">Time Left</p>
                                <hr className="black1" />
                                <div className="flex justify-center flex-row">
                                    <p className="bg-purple text-3xl text-black1 pr-6">List for sale</p>
                                    <button className="border-l-2 pl-6">...</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>
            <div>
                {/* <Button onClick={handleQuickListModalOpen}>Open modal</Button> */}
                <div>
                    <Modal
                        open={quickListModal}
                        onClose={handleQuickListModalClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 560 }} className="AtGradient">
                            <h3 id="parent-modal-title" className="text-purples m-0">Quick list</h3>
                            <p id="parent-modal-description">
                                <div className="rounded-2xl mt-8 h-fit">
                                    {/* <div className="w-18 AtBoxInner rounded-2xl duration-800 transition-all overflow-hidden">
                        <MagnifyImage
                        figClassName={` w-10 h-20 md:w-auto md:h-auto vimeo-video-container `}
                        src={building?.image ?? "/assets/images/detail-page.png"}
                        />
                    </div> */}
                                    <div className="flex mb-4">
                                        <div className="mr-12">

                                            <img className="w-[220px] h-[120] pl-24 pt-12 flex-none" src={building?.image ?? "/assets/images/NFT.jpg"}></img>
                                        </div>
                                        <div>

                                            <p className="bg-purple text-xl text-black1 mt-24">301-309 Oxford St, London W1D 1NB, UK</p>
                                        </div>
                                        {/* <div className="text-black1 p-2 text-center">
                                            <hr className="black1" />
                                            <p className="bg-purple text-3xl text-black1">Sale type</p>
                                            <hr className="black1" />
                                            <p className="bg-purple text-xl text-black1">Time Left</p>
                                            <hr className="black1" />
                                            <div className="flex justify-center flex-row">
                                                <p className="bg-purple text-xl text-black1 pr-6">List for sale</p>
                                                <button className="border-l-2 pl-6">...</button>
                                            </div>
                                        </div> */}
                                        {/* <div>
                                            <p>Listing price</p>
                                            <p>--ETH</p>
                                        </div> */}
                                    </div>
                                    <hr />
                                    <div className="container-fulid">
                                        <p className="text-black1 text-2xl font-semibold my-5">Set a price</p>
                                        <div className="flex justify-between">
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                label="Floor"
                                                defaultValue="0.001 ETH"
                                            />
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                label="Top trait"
                                                defaultValue="0.0036 ETH"
                                            />
                                        </div>

                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <Box
                                            component="form"
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField id="outlined-basic" label="Amount"
                                                sx={{
                                                    width: { sm: 320, md: 350 },
                                                    "& .MuiInputBase-root": {
                                                    }
                                                }}
                                                variant="outlined" />

                                        </Box>
                                        <FormControl sx={{ bl: 'none', minWidth: 120 }}>
                                            <Select
                                                value={age}
                                                onChange={handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                sx={{
                                                    width: { sm: 40, md: 145 },
                                                    "& .MuiInputBase-root": {
                                                    }
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <p className="text-black">ETH</p>
                                                </MenuItem>
                                                <MenuItem value={10}>BNB</MenuItem>
                                                <MenuItem value={20}>USDG</MenuItem>
                                                <MenuItem value={30}>USDT</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <p className="text-black1 text-2xl font-semibold my-4">Creator earnings</p>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            sx={{
                                                width: { sm: 45, md: 80 },
                                                "& .MuiInputBase-root": {
                                                }
                                            }}
                                            defaultValue="4.5 %"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-black1 text-2xl font-semibold my-6">Duration</p>
                                        <div className="flex justify-around mb-4">
                                            <Select
                                                value={age}
                                                onChange={handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                sx={{
                                                    width: { sm: 180, md: 120 },
                                                    "& .MuiInputBase-root": {
                                                    }
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                defaultValue="Jul 30, 2023"
                                                // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                                sx={{
                                                    width: { sm: 180, md: 390 },
                                                    "& .MuiInputBase-root": {
                                                    }
                                                }}
                                            />
                                        </div>
                                        <hr />
                                        <div className="mt-4">
                                            <div className="flex justify-between">
                                                <p className="text-black1 text-2xl">Listing price</p>
                                                <p className="text-black1 text-2xl">--ETH</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-black1 text-2xl">Creator earnings</p>
                                                <p className="text-black1 text-2xl">4.5%</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-black1 text-2xl">OpenSea fee</p>
                                                <p className="text-black1 text-2xl">2.5%</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-black1 text-2xl">Total potential earnings</p>
                                                <p className="text-black1 text-2xl">--ETH</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </p>
                            <ChildModal />
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default MarketPlaceDetailModule;

// export default function NestedModal() {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => {
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div>
//             <Button onClick={handleOpen}>Open modal</Button>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="parent-modal-title"
//                 aria-describedby="parent-modal-description"
//             >
//                 <Box sx={{ ...style, width: 400 }}>
//                     <h2 id="parent-modal-title">Text in a modal</h2>
//                     <p id="parent-modal-description">
//                         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                     </p>
//                     <ChildModal />
//                 </Box>
//             </Modal>
//         </div>
//     );
// }
