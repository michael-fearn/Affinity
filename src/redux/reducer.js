import data from './../components/ChartContainer/data'
import { Object } from 'core-js';

let initialState = {
    newScanUrl: 'https://www.threadless.com/',
    newScanDepth: 2,
    userDomains: [],
    scraperData: [],
    popularPages: [],
    username: 'bob',
    chartData: data,
    renderCount: 0
}

// TYPES
const UPDATE_NEWSCAN_URL = 'UPDATE_NEW_SCAN_URL'
const UPDATE_NEWSCAN_DEPTH = 'UPDATE_NEWSCAN_DEPTH'
const RESET_NEW_SCAN = 'RESET_NEW_SCAN'
const UPDATE_WORKING_DATA = 'UPDATE_WORKING_DATA'
const UPDATE_BASE_URL = 'UPDATE_BASE_URL'
const CLEAR_SCRAPER_DATA = 'CLEAR_SCRAPER_DATA'
const UPDATE_POPULAR_PAGE_DATA = 'UPDATE_POPULAR_PAGE_DATA'
const UPDATE_USER_DOMAINS = 'UPDATE_USER_DOMAINS'
const UPDATE_USER_NAME = 'UPDATE_USER_NAME'

// REDUCER
export default function reducer (state = initialState, action) {
    switch(action.type) {
        case UPDATE_NEWSCAN_URL:
            return Object.assign({}, state, {newScanUrl: action.payload})
        case UPDATE_NEWSCAN_DEPTH:
            return Object.assign({}, state, {newScanDepth: action.payload})
        case RESET_NEW_SCAN:
            return Object.assign({}, state, {newScanUrl: 'https://www.threadless.com/', newScanDepth: 2})
        case UPDATE_WORKING_DATA:
            return Object.assign({}, state, { scraperData: [...action.payload, ...state.scraperData ]})   
        case CLEAR_SCRAPER_DATA:
            return Object.assign({}, state, {scraperData: [], renderCount: 0})    
        case UPDATE_POPULAR_PAGE_DATA:
            return Object.assign({}, state, {popularPages: action.payload})
        case UPDATE_USER_DOMAINS:
            return Object.assign({}, state, {userDomains: action.payload})
        case UPDATE_USER_NAME:
            return Object.assign({}, state, {username: action.payload})
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

export const appActions = {
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
    }
}

export const dashboardActions = {
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
    },
    updatePopularPages: (payload) => {
        return {
            type: UPDATE_POPULAR_PAGE_DATA,
            payload
        }
    },
    updateUserDomains: (payload) => {
        return {
            type :UPDATE_USER_DOMAINS,
            payload
        }
    },
    editUserName: (payload) => {
        return {
            type: UPDATE_USER_NAME,
            payload
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

export const navBarActions = {
    editUserName: (payload) => {
        return {
            type: UPDATE_USER_NAME,
            payload
        }
    }
}

export const chartContainerActions = {
    newScanUrlHandler: (payload,) => {
        return {
            type: UPDATE_NEWSCAN_URL,
            payload
        }
    }
}