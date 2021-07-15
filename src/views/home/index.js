/* global BigInt */

import React from "react";
import HomeContent from "./home-content";
import Search from "../../components/search";
import Statistics from "../../components/statistics";
import altertT from "../../utils/images/alert.png";
import { getDataSource } from "../../datasource";
import OneTable from "../../components/one-table";
import Details from "../../components/details";
import DetailsContent from "../block/details/details";
import { LatestInfo } from "../../models/latestInfo";
import exitBlue from "../../utils/images/exit-blue.png";
import close from "../../utils/images/close.png";
import { withRouter } from "react-router-dom";
import Wrapper from "../../components/wrapper";

import config from "../../config/config";

const dataSource = getDataSource();

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      height: 0,
      maxHeight: 0,
      latestBlocks: [],
      latestTransactions: [],
      totalApps: 0,
      totalTokens: 0,
      showMessage: false,
      transactions: [],
      blockId: 0,
      blockHash: "",
      time: "",
      network: "",
      blockTitle: "LATEST BLOCK",
      showAdditionalBlock: false,
      data: {
        block: {
          header: {
            chain_id: "",
            consensus_hash: "",
            num_txs: 0,
            total_txs: 0,
          },
        },
      },
    };

    this.hideMessage = this.hideMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.getPreviousBlock = this.getPreviousBlock.bind(this);
    this.getNextBlock = this.getNextBlock.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.toggleAdditionalInformation = this.toggleAdditionalInformation.bind(
      this
    );
    this.navigateToBlock = this.navigateToBlock.bind(this);
  }

  componentWillMount() {
    dataSource.getTotalStakedApps().then((totalApps) => {
      this.setState({ totalApps: totalApps });
    });

    dataSource.getStakedSupply().then((totalStakedTokens) => {
      this.setState({ totalTokens: totalStakedTokens });
    });

    dataSource.getHeight().then((height) => {
      if (height !== undefined) {
        this.setState({ height: height, maxHeight: height });
      }
    });

    dataSource.getLatestBlock().then((block) => {
      if (block !== undefined) {
        this.setState({
          blockId: block.id,
          blockHash: block.number,
          time: block.timestamp,
          network: config.CHAIN_ID.toUpperCase(),
          data: block.data,
        });

        dataSource.getLatestTransactions(1, 100, block.number).then((txs) => {
          if (txs.length !== 0) {
            const latestArray = [];
            txs.forEach((tx) => {
              const latest = new LatestInfo(
                tx.height.toString(),
                tx.id,
                undefined,
                config.CHAIN_ID.toUpperCase(),
                tx.data.index,
                tx.data
              );

              latestArray.push(latest);
            });
            this.setState({ transactions: latestArray });
          }
        });
      }
    });
  }

  hideMessage() {
    this.setState({ showMessage: false });
  }

  showMessage() {
    this.setState({ showMessage: true });
  }

  toggleAdditionalInformation() {
    let value = !this.state.showAdditionalBlock;
    this.setState({ showAdditionalBlock: value });
  }

  getTransactions() {
    dataSource.getLatestTransactions(1, 100, this.state.height).then((txs) => {
      if (txs.length !== 0) {
        const latestArray = [];
        txs.forEach((tx) => {
          const latest = new LatestInfo(
            tx.height.toString(),
            tx.id,
            undefined,
            config.CHAIN_ID.toUpperCase(),
            tx.data.index,
            tx.data
          );
          latestArray.push(latest);
        });
        this.setState({ transactions: latestArray });
      } else {
        this.setState({ transactions: [] });
      }
    });
  }

  async getPreviousBlock() {
    // Scroll to top
    window.scrollTo(0, 0);
    const { height } = this.state;
    const targetHeight = height - BigInt(1);

    const block = await dataSource.getBlock(targetHeight);

    if (block !== undefined) {
      this.setState({
        blockId: block.id,
        blockHash: block.number,
        time: block.timestamp,
        network: config.CHAIN_ID.toUpperCase(),
        data: block.data,
        height: BigInt(targetHeight),
        blockTitle: `BLOCK ${targetHeight.toString()}`,
      });

      // Retrive the block transactions
      this.getTransactions();
    }
  }

  async getNextBlock() {
    // Scroll to top
    window.scrollTo(0, 0);
    const { height, maxHeight } = this.state;
    const targetHeight = BigInt(Number(height.toString()) + 1);

    const block = await dataSource.getBlock(targetHeight);

    if (block !== undefined) {
      this.setState({
        blockId: block.id,
        blockHash: block.number,
        time: block.timestamp,
        network: config.CHAIN_ID.toUpperCase(),
        data: block.data,
        height: BigInt(targetHeight),
        blockTitle:
          targetHeight === maxHeight
            ? "LASTEST BLOCK"
            : `BLOCK ${targetHeight.toString()}`,
      });

      this.getTransactions();
    }
  }

  navigateToBlock() {
    this.props.history.push(`/block/${this.state.height}`);
  }

  render() {
    const {
      showMessage,
      totalTokens,
      totalApps,
      blockTitle,
      blockHash,
      blockId,
      time,
      network,
      showAdditionalBlock,
      data,
      transactions,
      height,
      maxHeight,
    } = this.state;

    return (
      <HomeContent>
        <Search handler={this.showMessage} />

        <Statistics
          totalStaked={totalTokens}
          totalStakedApps={totalApps}
        />
        <div className="alert" style={showMessage ? {} : { display: "none" }}>
          <img src={altertT} alt="alert" />
          <div className="cont-alert">
            <div className="title">
              <h3>NO RESULT FOR THIS SEARCH!</h3>
            </div>
            <p>
              Try searching by transaction hash, block number, or account
              address
            </p>
            <button onClick={this.hideMessage}>
              <img id="close" src={close} alt="close" />
            </button>
          </div>
        </div>
        <DetailsContent>
          <div className="details">
            <Details
              className={"bd"}
              header={blockTitle}
              line1Header={"BLOCK #"}
              line2Header={"BLOCK HASH"}
              line3Header={"TIMESTAMP"}
              line4Header={"NETWORK"}
              line1Data={blockHash}
              line2Data={blockId}
              line3Data={time}
              line4Data={network}
              renderAdditional={showAdditionalBlock}
              data1Header={"CHAIN ID"}
              data2Header={"CONSENSUS HASH"}
              data3Header={"TX NUMBER"}
              data4Header={"TOTAL TXS"}
              data1={data.block.header.chain_id}
              data2={data.block.header.consensus_hash}
              data3={data.block.header.num_txs}
              data4={data.block.header.total_txs}
              additionalRightComponent={
                <button
                  className="right-container next-image-button"
                  onClick={this.toggleAdditionalInformation}
                >
                  <img src={exitBlue} alt="exit" />
                </button>
              }
            />
          </div>

          <div className="container">
            <div className="center">
              <button
                style={showAdditionalBlock === false ? {} : { display: "none" }}
                onClick={this.toggleAdditionalInformation}
              >
                Additional Information
              </button>
            </div>
          </div>

          <div
            className="one-table-container black"
            style={{ marginTop: "70px" }}
          >
            <OneTable
              header={"TRANSACTIONS IN THIS BLOCK"}
              className={"l-transactions"}
              columnOne={"TRANSACTION HASH"}
              columnTwo={"BLOCK #"}
              columnThree={"INDEX"}
              link={"tx"}
              data={transactions}
              rightComponent={
                <span className="right-container">{transactions.length}</span>
              }
            />
          </div>

          <div className="one-table-container" style={{ marginTop: "70px" }}>
            <Wrapper className="t-wrapper">
              <button
                className="no-background-button"
                style={height > 0 ? {} : { display: "none" }}
                onClick={this.getPreviousBlock}
              >
                <div className="center">
                  <div className="left-img" />
                  <span style={{ marginLeft: "5px" }}>Previous Block</span>
                </div>
              </button>

              <button
                className="no-background-button right"
                style={height < maxHeight ? {} : { display: "none" }}
                onClick={this.getNextBlock}
              >
                <div className="center">
                  <span style={{ marginRight: "5px" }}>Next Block</span>
                  <div className="right-img" />
                </div>
              </button>
            </Wrapper>
          </div>
        </DetailsContent>
      </HomeContent>
    );
  }
}

export default withRouter(Home);
