import {LightningElement,api,wire,track} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import EpiList_message from '@salesforce/messageChannel/EpisodeListRefresh__c';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
import EPISODE_MESSAGE from '@salesforce/messageChannel/EpisodeID__c';

export default class EpisodeRefreshRequest extends LightningElement {
    
    _episodeID;
    @api
    get episodeID() {
        return this._episodeID;
    }
    set episodeID(value) {
        this._episodeID = value;
    }

    
    _seriesID;
    @api
    get seriesID() {
        return this._seriesID;
    }
    set seriesID(value) {
        this._seriesID = value;
    }
    @wire(MessageContext) messageContext;

    connectedCallback(){
        const messageList = {action: 'refresh', seriesid: this.seriesID };
        const messageEpi = {episodeID: this.episodeID};
        console.log(messageEpi);
        console.log(messageList);
        publish(this.messageContext, EpiList_message, messageList);
        publish(this.messageContext, EPISODE_MESSAGE, messageEpi);
        const navigateNextEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(navigateNextEvent);
    }

}