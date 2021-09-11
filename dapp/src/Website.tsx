import React, { useState, useEffect } from 'react';
import Page, { HeaderPage } from './Pages';
import { Navbar } from './Components';
import { PresaleDApp } from './DApp';

import logo from './assets/logo.png';
import whitepaper from './assets/whitepaper.png';
import telegram from './assets/telegram.png';
import athek from './assets/AtheK.png'
import pogchampdev from './assets/PogChampDev.png'

import './styles/Website.scss';
import './styles/Footer.scss';

const within = (x: number, lower: number, upper: number) => { return (x >= lower) && (x <= upper)}


function Website() {

  
  const [pageNumber, setPageNumber] = useState( 0 );

  const [paging, setPaging] = useState( false );
  const [changingLogo, setChangingLogo] = useState( false );
  const [canChangePage, setCanChangePage] = useState( true );

  const [touchStart, setTouchStart] = useState( 0 );
  const [touchConsumed, setTouchConsumed] = useState( false );


  useEffect(() => {

    new Image().src = athek
    new Image().src = pogchampdev

  }, []);

  const pages: Page[] = [
    {
      pageProps: {
      },
      page: 
      <HeaderPage
        header={<span>PogChamp.Money</span>}
        body={<span>PogChamp.Money is an innovative, transparent, MIT-Licensed, deflationary token and decentralized app the Binance Smart Chain, leveraging blockchain to bridge content creators and consumers with a truly free patron system.</span>}
        footer={<span>Swipe or Scroll to Browse <br></br> <small> or </small> <br></br> <span className="Link" onClick={ () => { changePage(pages.length-1)} }>Jump to dApp</span></span>}
      />
    },
    {
      pageProps: {},
      page: 
      <div>
        <p>
          <strong>PogChamp.Money</strong> will deliver at launch an innovative <strong>gamified and proactive redistribution system</strong>, plus a frictionless yield farm for <strong>$POG-BNB LP</strong>, which will forever lock $POG liquidity out of the developement team's hands while incentivizing liquidity providers. 
        </p>
        <p>
          <strong>Our Roadmap</strong>  will grow $POG into a decentralized, fast, fun and easy-to-use donation system, that any content creator can easily use on top of his preferred platform or quickly integrate in its own website!
        </p>
      </div>
    },
    {
      pageProps: {},
      page: 
      <div className="Roadmap">
        <h3>Our Roadmap for</h3>
        <h2>
            September 2021
        </h2>
        <ul>
            <li className="done"><span></span>Website Launch!</li>
            <li className="done"><span></span>Telegram Group Launch!</li>
            <li className="done"><span></span>Initial Marketing Wave!</li>
            <li><span></span>Presale Launch!</li>
            <li><span></span>Swapping Enabled, Liquidity Farms!</li>
        </ul>
      </div>
    },
    {
      pageProps: {},
      page: 
      <div className="Roadmap">
        <h3>Our Roadmap for</h3>
        <h2>
            Q4 2021
        </h2>
        <ul>
          <li><span></span>Pog Posting (Proactive Farming)!</li>
          <li><span></span>Contests &amp; Giveaways!</li>
          <li><span></span>PogChamp Patrons System!</li>
          <li><span></span>Content Creators Collabs!</li>
          <li><span></span>More to be Revealed!</li>
        </ul>
      </div>
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>Tokenomics</span>}
        header={<span>DEFLATIONARY SUPPLY 813.916.297 $POG</span>}
        body={<span>Supply is equal to the number of PogChamp emotes posted between January 9, 2016 and January 6, 2021 when T*itch eventually removed it. 2% of each transaction is burned forever, making the token deflationary.</span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>Tokenomics</span>}
        header={<span>FAIR DISTRIBUTION</span>}
        body={<span>30% of supply will be sold in a 50BNB Softcap, 200BNB Hardcap presale. The entire amount accrued will go to Liquidity, along with an other 30% of the supply. 20% will constitute the initial pool for the PogPosting system, 15% will be set aside for marketing, while only 5% will pay developement expenses.</span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>Tokenomics</span>}
        header={<span>INNOVATIVE AND FUN REDISTRIBUTION</span>}
        body={<span>3% of each transaction is sent to the <strong>PogPosting pool</strong>. Once every eight hours, you can <i>"Post your $POGs"</i> locking them for the next eight hours, to claim more from the pool's balance!</span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>Tokenomics</span>}
        header={<span>HOLDING ENCOURAGED</span>}
        body={<span>PogPosting can give great rewards - but will lock your ability to send tokens for eight hours. Will you take a safe PogPosting reward, or will you keep your $POG unlocked and ready to scalp? Your call!</span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>Tokenomics</span>}
        header={<span>PERPETUAL LIQUIDITY</span>}
        body={<span>PogChamp will follow <a href="https://toadytoad.medium.com/the-toad-network-46f5f6872ab6">Toad.Network's</a> novel approach at incentivizing liquidity providers. Initial LP tokens will be added to a special farm contract and ridistributed to liquidity providers. You can sleep safe knowing that your swapping liquidity will be there, always.</span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>Tokenomics</span>}
        header={<span>USE CASE!</span>}
        body={<span>PogChamp.Money aims to create a decentralized, fast, and easy-to-use donation system. Any content creator will be able to easily integrate PogChamp.Money in his own website, or on existing popular platforms, with just a few clicks. Patrons will be able to donate with the same ease - only a Web3js Wallet required!</span>}
      />
    },
    {
      pageProps: {
        logoImage: pogchampdev
      },
      page: 
      <HeaderPage
        superHeader={<span>Dev Profile</span>}
        header={<span>PogChampDev</span>}
        body={<span>PogChampDev was born with a rare disease forcing his jaw open.
            <br/>He felt redemption in witnessing the success of Gootecks' emote, but that feeling was quickly crushed with its banishment from Tw*tch.
            Seeking to drown his feelings of defeat in alcohol, he stumbled on AtheK's wineyard where his revenge plan was born.
            <br/>Enrolling AtheK, he set off to develop a free and decentralized donation system to fight his oppressors.
          </span>}
      />
    },
    {
      pageProps: {
        logoImage: athek
      },
      page: 
      <HeaderPage
        superHeader={<span>Dev Profile</span>}
        header={<span>AtheK</span>}
        body={<span>AtheK was once a winemaker in the mediterranean countryside.
            <br/>After stumbling on an Ethereum block in a night drunken stupor, he has awakened to a hidden knowledge of main Solidity, JS and Web3 developement.
            He has since committed to contributing to reliability of the cryptospace through a quest for clarity of code and rules.
            <br/>He likes open source software, privacy and good wine.
          </span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>FAQ</span>}
        header={<span>Why aren't you Doxxed?</span>}
        body={<span>We strongly believe Blockchain's breakthrough value is creating a network that can function without trust between its partecipating nodes.
          In Blockchain, you don't need to trust someone to work with him - because you know he abides to certain strict rules, and his behaviour is foreseeable.
          For this reason, we strive to get people trust not through fame but trough clarity of our Smart Contracts. It is also the reason why PogChamp is fully open source.</span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>FAQ</span>}
        header={<span>What if the Presale fails?</span>}
        body={<span>In the event the presale fails, in the sense it doesn't reach the soft cap, users will be able to claim back their money through our dApp thanks to our Smart Contracts code.
          Even if we were malicious and took down our dApp, you would still be able to use it easily by getting a copy from our GitHub. As we said, trust on blockchain is built on facts and rules and not fame.</span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>FAQ</span>}
        header={<span>How does your donation system work?</span>}
        body={<span>Our donation system is exceedingly simple. Content creators can simply paste an url in a set format (PogChamp.Money/donate/MyWalletAddress) on their profile. Donors can donate in a simple click through a dApp.</span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>FAQ</span>}
        header={<span>Is the Token needed?</span>}
        body={<span>True, a dApp this simple could have been built without a token. However, our plan is to evolve our dApp further. 
          Eventually we plan to let content creators personalize their profile by minting a NFT through $POG, and more importantly, we plan letting donors customize their donations with an NFT too.
          It will all be powered by $POG.</span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>FAQ</span>}
        header={<span>NFT for Donors?</span>}
        body={<span>In practice, you will be able to chose an image and a custom message before sending your donation. 
          When you donate in this fashion, you will receive an auto-minted NFT with that content as proof of your donation. Users of the PogChamp Extension viewing the recepient of a donation with the PogChamp.Money will also be able to view a nice pop-up of your donation.</span>}
      />
    },
    {
      pageProps: {},
      page: 
      <HeaderPage
        superHeader={<span>FAQ</span>}
        header={<span>Wait, there's an extension?</span>}
        body={<span>PogChamp.Money will feature a browser extension allowing users to more quickly verify donor's addresses, and to view fellow donors to see the other people's donation real-time.
          Streamer will be also able to use a similar PogChamp app to be show donations coming in through PogChamp.Money.
          We except the NFT proof of donation to also gain value through this: imagine owning a tradeable proof-of-donation that popped up during the PewDiePie bridge incident. Wouldn't that be a blast.</span>}
      />
    },
    {
      pageProps: {
      },
      page:
      <div className="Presale">
        <h3>Presale Starts</h3>
        <h2>
          12th September 2021
        </h2>
        <p>
          We will launch our presale along with our dApp on 12th September 2021 - it will be completely handled through our dApp. In the meantime, join our Telegram or download our Whitepaper.
        </p>
        <a className="half-section" style={{backgroundImage: 'url('+telegram+')'}} href="https://t.me/PogChampMoney" target="blank"></a>
        <a className="half-section" style={{backgroundImage: 'url('+whitepaper+')'}} href="/downloads/whitepaper.pdf" target="blank"></a>
      </div>
    },
    {
      pageProps: {hideLogo: true},
      page: 
      <PresaleDApp></PresaleDApp>
    },    
  ]

  function handleTouchStart(e: React.TouchEvent<HTMLElement>) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLElement>) {
    if (touchConsumed)
      return

    if (touchStart - e.targetTouches[0].clientX > 80 ) 
    {
      setTouchConsumed(true)
      changePage(pageNumber+1)
    }
    if (touchStart - e.targetTouches[0].clientX < -80 ) 
    {
      setTouchConsumed(true)
      changePage(pageNumber-1)
    }
  }

  function handleWheel(e: React.WheelEvent<HTMLElement>) {
    if (e.deltaY > 50 ) 
    {
      changePage(pageNumber+1)
    }
    if (e.deltaY < -50 ) 
    {
      changePage(pageNumber-1)
    }
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLElement>) {
      setTouchConsumed(false)
  }

  function handleNavigationBarClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    let stepSize = (window.innerWidth * 0.8) / ( pages.length)
    let pageIdx = ( e.clientX - (window.innerWidth * 0.1) ) / stepSize

    changePage( Math.round(pageIdx-1) )
  }

  const changePage = (pageID: number) => {
    if (!canChangePage || (pageID >= pages.length) || (pageID === pageNumber) || (pageID <= -1) )
      return

    setPaging(true)
    setCanChangePage(false)
    setTimeout( () => { setPageNumber(pageID); setPaging(false) }, 500 )
    setTimeout( () => { setCanChangePage(true) }, 100)

    if (pages[pageNumber].pageProps.logoImage !== pages[pageID].pageProps.logoImage)
    {
      setChangingLogo(true)
      setTimeout( () => { setChangingLogo(false) }, 600)
    }

  }

  return (
    <div className="Content" 
      onTouchStart={ (e) => {  handleTouchStart(e) } }
      onTouchMove={ (e) => {  handleTouchMove(e) } }
      onTouchEnd={ (e) => {  handleTouchEnd(e) } }
      onWheel={ (e) => {  handleWheel(e) } }
    >

      <header className="Header">
        
        <Navbar>
          <span className={ within(pageNumber, 0, 1) ? "selected" : "" } onClick={ () => changePage(0) }>HOME</span>
          <span className={ within(pageNumber, 2, 3) ? "selected" : "" } onClick={ () => changePage(2) }>ROADMAP</span>
          <span className={ within(pageNumber, 4, 9) ? "selected" : "" } onClick={ () => changePage(4) }>TOKENOMICS</span>
          <span className={ within(pageNumber, 10, 11) ? "selected" : "" } onClick={ () => changePage(10) }>DEV PROFILES</span>
          <span className={ within(pageNumber, 12, 17) ? "selected" : "" } onClick={ () => changePage(12) }>FAQ</span>
          <span className={ pageNumber === 18 ? "selected" : "" } onClick={ () => changePage(18) }>PRESALE</span>
        </Navbar>

        {
          <img src={ pages[pageNumber].pageProps.logoImage ? pages[pageNumber].pageProps.logoImage : logo} className={"Logo " + (changingLogo ? "changing " : "") + (pages[pageNumber].pageProps.hideLogo ? "hidden" : "")} alt="logo" />
        }
        

        <div className={"Page-Wrapper " + (paging ? "paging-out" : "")}>

          { pages[pageNumber].page }
          
        </div>

        {
          <div className="Footer ProgressBar">
            <div className="Wrapper" onClick={ (e) => { handleNavigationBarClick(e) } } >
              <div className="Bar" style={{ width: ((pageNumber + 1) * 100 / pages.length) + "%"}}/>
            </div>
          </div>
        }

      </header>
    </div>
  );

}

export default Website;
