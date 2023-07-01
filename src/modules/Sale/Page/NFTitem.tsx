import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router';
import {useRouter} from "next/router"
import { Image, Nav } from 'react-bootstrap';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

// import './NFTItem.css';

// import diamondImg from '../assets/images/diamond.png';
// import img from '../../assets/images/collection/collection.png';

const NFTItem = (props) => {
//   let navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="nft-item">
        {/* <div onClick={() => useRouter("/nft")}> */}
          <img className="nft-img w-100" src='./assets/images/nft-img-1.png' />
        </div>
        <div className="nft-content">
          <div className='d-flex justify-content-between'>
            <div className='nft-collection'>
              {props.data.collection}
            </div>
              <div className='nft-price-title'>
                <img className='nft-icon' src='./assets/images/nft-img-1.png' /> Price
              </div>
          </div>
          <div className='d-flex justify-content-between'>
            <h4 className="nft-name">{props.data.name}</h4>
            <h4 className='nft-price'>
              {props.data.price} BNB
            </h4>
          </div>
          <div className='d-flex justify-content-between mb-2'>
              <h6 className="nft-creator">Owner : 
              {/* <Link className="nft-creator" to={'/'}>{props.data.owner}</Link> */}
              </h6>
              {props.data.leftTime && 
                <h6 className="nft-creator"><i className='far fa-clock time-icon'></i>{props.data.leftTime}</h6>
              }
          </div>
          <div>
            {!props.data.leftTime ? 
              <button className='btn nft-buy-btn'>Buy Now</button> : 
              <button className='btn nft-buy-btn' onClick={() => setShow(true)}>Place a Bid</button>
            }
          </div>
        </div>
      {/* </div> */}
      <Modal open={show} onClose={() => setShow(false)} center>
          <h2 className='modal-title'>Place a bid</h2>
          <div className='d-flex justify-content-center my-5'>
            <img className='modal-img' src='../assets/nft/nft-img-2.jpg' />
          </div>
          <div className='bid-modal-content'>
            <h4 className='bid-title'>Your bid</h4>
            <input type="number" className='bid-price-input' min="0" placeholder='0.00 BNB' />
            <div className='my-3'>
              <div className='d-flex justify-content-between'>
                <h6 className='bid-text'>Your Balance</h6>
                <h6 className='bid-text'>95 BNB</h6>
              </div>
              <div className='d-flex justify-content-between'>
                <h6 className='bid-text'>Service Fee</h6>
                <h6 className='bid-text'>0.05 BNB</h6>
              </div>
              <div className='d-flex justify-content-between'>
                <h6 className='bid-text'>Total Bid Amount</h6>
                <h6 className='bid-text'>50 BNB</h6>
              </div>
            </div>
            <button className='btn bid-btn'>Place a bid</button>
          </div>
      </Modal>
    </>
  );
};

export default NFTItem;
