import { HomeListProps } from '../../../type'

const InitState = {
    page: 1,
    data: [],
    isLoad: true,
    pageYOffset: 0,
    PageState: true,
    type: '推荐'
}

export default (state: HomeListProps = InitState, action: any): HomeListProps => {
    switch (action.type) {
        case 'homeList/initList':
            return {
                ...state,
                page: 1,
                data: [],
                isLoad: true,
                pageYOffset: 0,
                PageState: true,
            }
        case 'homeList/changData':
            return {
                ...state,
                PageState: false,
                data: [...state.data, ...action.value],
                isLoad: action.value.length >= 8
            }
        case 'homeList/InitChangData':
            return {
                data: [...action.value],
                page: 1,
                isLoad: action.value.length >= 8,
                pageYOffset: 0,
                PageState: false,
                type: action.typeValue
            }
        case 'homeList/changePageYOffset' :
            return {
                ...state,
                pageYOffset: action.pageYOffset
            }
        case 'homeList/changePage':
            return {
                ...state,
                PageState: true,
                page: state.page + 1,
            }
        default:
            return state
    }
}



