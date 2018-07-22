import data from './../components/ChartContainer/data'

let initialState = {
    newScanUrl: 'http://www.threadless.com',
    newScanDepth: 2,
    baseUrl: '',
    scraperData: [],
    popularPages: [],
    username: 'bob',
    chartData: data
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
            console.log("reducer firing") 
            return Object.assign({}, state, {newScanUrl: 'http://www.threadless.com', newScanDepth: 2})
        case UPDATE_WORKING_DATA:
          //  console.log(state.scraperData)        
            return Object.assign({}, state, { scraperData: [...action.payload, ...state.scraperData]})
        case UPDATE_BASE_URL:
            return Object.assign({}, state, {baseUrl: action.payload})    
        case CLEAR_SCRAPER_DATA:
            return Object.assign({}, state, {scraperData: []})    
        case UPDATE_POPULAR_PAGE_DATA:
            return Object.assign({}, state, {popularPages: action.payload})
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
    },
    getPopularPages: (payload) => {
        return {
            type: UPDATE_POPULAR_PAGE_DATA,
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