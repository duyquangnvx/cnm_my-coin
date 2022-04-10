import React from "react";
import BaseView from "../base/BaseView";
import "../styles/home-page.scss"
import "../styles/style_1.css"
import "../styles/style_2.css"
import "../styles/style_3.css"
import "../styles/style_4.css"
import "../styles/style_5.css"
import "../styles/style_6.css"

import bgHomePageSpacemanAndDog from "../assets/images/bg-home-spaceman-and-dog.313ea5b0.svg"

class HomePage extends BaseView {


    render() {
        return (
            <div >
                <div data-app="true" className="v-application walletBg v-application--is-ltr theme--light" id="app">
                    <div className="v-application--wrap" style={{backgroundColor: "rgb(24, 79, 144)"}}>
                        <div>
                            <div className="default-header expandHeader">
                                <div
                                    className="d-flex align-center justify-center pa-2 greyLight textMedium--text" style={{backgroundColor: "#ffffff"}}> Missing
                                    the old version?&nbsp; <a href="https://v5.myetherwallet.com"
                                                              rel="noopener noreferrer"> You can find version 5
                                        here </a>
                                </div>
                                <div className="container d-flex align-center pt-8">
                                    <div className="row no-gutters align-center">
                                        <div className="d-md-none col col-4">
                                            <div data-v-7faa5f74=""
                                                 className="mew-component--landing-page-menu-mobile ml-n2">
                                                <button data-v-7faa5f74="" type="button"
                                                        className="v-btn v-btn--icon v-btn--round theme--light v-size--x-large">
                                                <span className="v-btn__content"><img
                                                    src={require("../assets/images/icon-menu.959d2406.svg").default}
                                                    height="40"/></span></button>
                                                <aside data-v-7faa5f74=""
                                                       className="v-navigation-drawer v-navigation-drawer--absolute v-navigation-drawer--close v-navigation-drawer--is-mobile v-navigation-drawer--temporary theme--light expandHeader"
                                                       style={{
                                                           height: "100%",
                                                           top: "0px",
                                                           transform: "translateX(-100%)",
                                                           width: "256px"
                                                       }}
                                                       data-booted="true">
                                                    <div className="v-navigation-drawer__content">
                                                        <div data-v-7faa5f74="" tabIndex="-1"
                                                             className="pt-8 pb-8 pl-4 pr-1 v-list-item theme--light">
                                                            <div data-v-7faa5f74=""
                                                                 className="v-image v-responsive mx-auto theme--light"
                                                                 style={{maxHeight: "36px", maxWidth: "130px"}}>
                                                                <div
                                                                    className="v-image__image v-image__image--preload v-image__image--cover"
                                                                    style={{backgroundPosition: "center center"}}/>
                                                                <div className="v-responsive__content"/>
                                                            </div>
                                                            <div data-v-7faa5f74="" className="spacer"/>
                                                            <button data-v-7faa5f74="" type="button"
                                                                    className="v-btn v-btn--icon v-btn--round theme--light v-size--x-large">
                                                            <span className="v-btn__content"><i data-v-7faa5f74=""
                                                                                                aria-hidden="true"
                                                                                                className="v-icon notranslate mdi mdi-window-close theme--light white--text"
                                                                                                style={{fontSize: "36px"}}></i></span>
                                                            </button>
                                                        </div>
                                                        <div data-v-7faa5f74="" role="list"
                                                             className="v-list px-2 v-sheet theme--dark expandHeader">
                                                            <div data-v-7faa5f74="" tabIndex="-1" role="listitem"
                                                                 className="mb-3 v-list-item theme--dark">
                                                                <div data-v-7faa5f74=""
                                                                     className="v-list-item__content">
                                                                    <div data-v-7faa5f74=""
                                                                         className="mew-heading-2">How it
                                                                        works
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div data-v-7faa5f74="" className="v-list-group mb-3">
                                                                <div tabIndex="0" aria-expanded="false" role="button"
                                                                     className="v-list-group__header v-list-item v-list-item--link theme--dark">
                                                                    <div data-v-7faa5f74=""
                                                                         className="v-list-item__content">
                                                                        <div data-v-7faa5f74=""
                                                                             className="mew-heading-2">Popular
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="v-list-item__icon v-list-group__header__append-icon">
                                                                        <i aria-hidden="true"
                                                                           className="v-icon notranslate mdi mdi-chevron-down theme--dark"></i>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div data-v-7faa5f74="" className="v-list-group mb-3">
                                                                <div tabIndex="0" aria-expanded="false" role="button"
                                                                     className="v-list-group__header v-list-item v-list-item--link theme--dark">
                                                                    <div data-v-7faa5f74=""
                                                                         className="v-list-item__content">
                                                                        <div data-v-7faa5f74=""
                                                                             className="mew-heading-2">More
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="v-list-item__icon v-list-group__header__append-icon">
                                                                        <i aria-hidden="true"
                                                                           className="v-icon notranslate mdi mdi-chevron-down theme--dark"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div data-v-7faa5f74="" tabIndex="-1" role="listitem"
                                                                 className="mb-3 v-list-item theme--dark"><a
                                                                data-v-7faa5f74=""
                                                                href="https://ccswap.myetherwallet.com/#/"
                                                                target="_blanks">
                                                                <div data-v-7faa5f74=""
                                                                     className="v-list-item__content white--text">
                                                                    <div data-v-7faa5f74=""
                                                                         className="mew-heading-2">Buy
                                                                        ETH
                                                                    </div>
                                                                </div>
                                                            </a></div>
                                                        </div>
                                                    </div>
                                                    <div className="v-navigation-drawer__border"></div>
                                                </aside>
                                            </div>
                                        </div>
                                        <div className="col col-4"><a href="/" aria-current="page"
                                                                      className="router-link-exact-active router-link-active">
                                            <div className="v-image v-responsive theme--light mx-auto"
                                                 style={{maxHeight: "36px", maxWidth: "130px"}}>
                                                <div className="v-responsive__sizer"
                                                     style={{paddingBottom: "38.3333%"}}></div>
                                                <div className="v-image__image v-image__image--cover"
                                                     style={{
                                                         backgroundImage: "url(&quot;https://www.myetherwallet.com/img/logo-mew.f6482e98.svg&quot;)",
                                                         backgroundPosition: "center center"
                                                     }}></div>
                                                <div className="v-responsive__content" style={{width: "300px"}}></div>
                                            </div>
                                        </a></div>
                                        <div className="justify-space-between d-none d-md-flex col col-4"><a
                                            href="/how-it-works" className="white--text text-decoration--none"> What is
                                            MEW </a>
                                            <div className="v-menu"></div>
                                            <span className="white--text cursor-pointer">
      Wallet actions
      <i aria-hidden="true"
         className="v-icon notranslate mdi mdi-chevron-down theme--light title white--text"></i> </span><a
                                                href="https://ccswap.myetherwallet.com/#/" target="_blank"
                                                className="white--text text-decoration--none"> Buy ETH </a></div>
                                        <div className="text-right col col-4">
                                            <div data-v-0d8c8098="" className="mew-component--mew-tools ml-auto">
                                                <button data-v-0d8c8098="" type="button"
                                                        className="d-none d-lg-block btn-remove-style v-btn v-btn--outlined theme--light v-size--x-large"
                                                        role="button" aria-haspopup="true" aria-expanded="false"
                                                        style={{height: "50px"}}><span className="v-btn__content"><button
                                                    data-v-dd89ee9a="" data-v-0d8c8098="" type="button"
                                                    className="px-2 v-btn v-btn--outlined theme--light v-size--default greenPrimary--text large-btn btn-outline mew-button"><span
                                                    className="v-btn__content"><div data-v-dd89ee9a=""
                                                                                    className="d-flex justify-center align-center">
                                                <div data-v-0d8c8098="" className="d-flex align-center"><img
                                                    data-v-0d8c8098=""
                                                    src="data:image/png;base64,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"
                                                    alt="Mew tools"/><div data-v-0d8c8098=""
                                                                          className="d-none d-md-block mew-label">MEW Hub</div></div></div></span></button></span>
                                                </button>
                                                <div data-v-0d8c8098="" className="v-menu"></div>
                                                <button data-v-0d8c8098="" type="button"
                                                        className="d-lg-none v-btn v-btn--outlined theme--light v-size--default greenPrimary--text"
                                                        role="button" aria-haspopup="true" aria-expanded="false"
                                                        style={{
                                                            height: "36px",
                                                            minWidth: "36px",
                                                            padding: "0px",
                                                            borderRadius: "10px"
                                                        }}>
                                                <span className="v-btn__content"><img data-v-0d8c8098=""
                                                                                      src="data:image/png;base64,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"
                                                                                      alt="Mew Hub" height="20"/></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <main className="v-main" style={{padding: "0px", backgroundColor: "rgb(24, 79, 144)"}} data-booted="true">
                                <div className="v-main__wrap" >
                                    <div>
                                        <div data-v-f2b7728c="" className="mew-component--landing">
                                            <div data-v-f2b7728c=""
                                                 className="desktop-content d-none d-lg-block expandHeader">
                                                <div data-v-f2b7728c=""
                                                     className="container banner-content-container d-flex align-center justify-space-between">
                                                    <div data-v-f2b7728c=""
                                                         className="v-card v-card--flat v-sheet theme--light rounded-0 transparent"
                                                         style={{maxWidth: "430px"}}>
                                                        <div data-v-f2b7728c="" className="white--text mew-title"><span
                                                            data-v-f2b7728c=""> Ethereum's  </span><span
                                                            data-v-f2b7728c=""> Original Wallet </span>
                                                        </div>
                                                        <p data-v-f2b7728c="" className="white--text mt-3"> MEW
                                                            (MyEtherWallet) is a free, client-side interface helping you
                                                            interact with the Ethereum blockchain. Our easy-to-use,
                                                            open-source platform allows you to generate wallets,
                                                            interact
                                                            with smart contracts, and so much more. </p>
                                                        <div data-v-f2b7728c="" className="mt-9 d-flex">
                                                            <button data-v-dd89ee9a="" data-v-f2b7728c="" type="button"
                                                                    className="mr-3 v-btn v-btn--has-bg theme--light v-size--default greenPrimary xlarge-btn white--text btn-background mew-button" style={{backgroundColor: "rgb(5, 192, 165)"}}>
                                                            <span className="v-btn__content"><div data-v-dd89ee9a=""
                                                                                                  className="d-flex justify-center align-center"><span
                                                                data-v-dd89ee9a="" className="font-weight-regular">Create a new wallet </span> </div></span>
                                                            </button>
                                                            <button data-v-dd89ee9a="" data-v-f2b7728c="" type="button"
                                                                    className="v-btn v-btn--outlined theme--light v-size--default greenPrimary--text xlarge-btn btn-outline mew-button">
                                                            <span className="v-btn__content"><div data-v-dd89ee9a=""
                                                                                                  className="d-flex justify-center align-center"><span
                                                                data-v-dd89ee9a="" className="font-weight-regular">Access my wallet </span> </div></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <img data-v-f2b7728c=""
                                                         src={require("../assets/images/bg-home-spaceman-and-dog.313ea5b0.svg").default}
                                                         alt="Spaceman and his dog" height="500"/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>

                        </div>
                        <div>
                            <div data-v-58d62592="" role="dialog" className="v-dialog__container"></div>
                            <div data-v-58d62592="" role="dialog" className="v-dialog__container"></div>
                            <div data-v-58d62592="" role="dialog" className="v-dialog__container"></div>
                            <div data-v-58d62592="" role="dialog" className="v-dialog__container"></div>
                        </div>
                        <div>
                            <div data-v-c322c29a="" role="dialog" className="v-dialog__container"></div>
                            <div data-v-04bafa66="" role="dialog"
                                 className="v-dialog__container border-radius--10px"></div>
                        </div>
                        <div data-v-96147102="">
                            <div data-v-96147102="" role="dialog" className="v-dialog__container"></div>
                        </div>
                    </div>

                    <div role="document" data-v-58d62592="" className="v-dialog__content" style={{zIndex: 202}}>
                        <div className="v-dialog v-bottom-sheet"
                             style={{transformOrigin: "center center", display: "none"}}>
                            <div data-v-58d62592="" className="text-center v-sheet theme--light rounded-0 white"
                                 style={{height: "80px"}}>
                                <div data-v-58d62592="" className="container fill-height">
                                    <div data-v-58d62592=""
                                         className="row align-center justify-center font-weight-medium titlePrimary--text">
                                        <div data-v-58d62592="" className="d-flex align-center">

                                            <a data-v-58d62592="" className="primary--text">
                                            </a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;