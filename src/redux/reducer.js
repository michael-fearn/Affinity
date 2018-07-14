import { Object } from "core-js";

let initialState = {
    newScanUrl: 'http://www.threadless.com',
    newScanDepth: 1,
    baseUrl: '',
    scraperData: []
}

// TYPES
const UPDATE_NEWSCAN_URL = 'UPDATE_NEW_SCAN_URL'
const UPDATE_NEWSCAN_DEPTH = 'UPDATE_NEWSCAN_DEPTH'
const RESET_NEW_SCAN = 'RESET_NEW_SCAN'
const UPDATE_WORKING_DATA = 'UPDATE_WORKING_DATA'
const UPDATE_BASE_URL = 'UPDATE_BASE_URL'
const CLEAR_SCRAPER_DATA = 'CLEAR_SCRAPER_DATA'

// REDUCER
export default function reducer (state = initialState, action) {
    switch(action.type) {
        case UPDATE_NEWSCAN_URL:
            return Object.assign({}, state, {newScanUrl: action.payload})
        case UPDATE_NEWSCAN_DEPTH:
            return Object.assign({}, state, {newScanDepth: action.payload})
        case RESET_NEW_SCAN:
            console.log("reducer firing") 
            return Object.assign({}, state, {newScanUrl: '', newScanDepth: 1})
        case UPDATE_WORKING_DATA:
            return Object.assign({}, state, { scraperData: [...state.scraperData, ...action.payload]})
        case UPDATE_BASE_URL:
            return Object.assign({}, state, {baseUrl: action.payload})    
        case CLEAR_SCRAPER_DATA:
            return Object.assign({}, state, {scraperData: []})    

        default:
        
            return state;
    }
}

// ACTION CREATORS

export const  newScanActions = {
    newScanUrlHandler: (payload,) => {
        return {
            type: UPDATE_NEWSCAN_URL,
            payload
        }
    },
    newScanDepthHandler: (payload) => {
        return {
            type: UPDATE_NEWSCAN_DEPTH,
            payload
        }
    }
}

export const dashboardActions = {
    resetSubmitNewScanHandler: () => {
        return {
            type: RESET_NEW_SCAN
        }
    },
    updateScraperData: (payload) => {
        return {
            type: UPDATE_WORKING_DATA,
            payload
        }
    },
    setBaseUrl: (payload) => {
        return {
            type: UPDATE_BASE_URL,
            payload
        }
    },
    clearScraperData: () => {
        return {
            type: CLEAR_SCRAPER_DATA
        }
    }

}

export const scraperDataActions = {
    updateScraperData: (payload) => {
        return {
            type: UPDATE_WORKING_DATA,
            payload
        }
    }
}
