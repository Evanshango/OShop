import axios from "axios"
import {authError, authRequest, authSuccess, clearAuthErrors, signOut} from "../redux/auth/authActions"
import {
    addSectionError,
    addSectionRequest,
    addSectionSuccess,
    clearSectionErrors,
    deleteSectionError,
    deleteSectionSuccess,
    sectionsError,
    sectionsRequest,
    sectionsSuccess
} from "../redux/sections/sectionActions"
import {
    addCategoryError,
    addCategoryRequest,
    addCategorySuccess,
    categoriesError,
    categoriesRequest,
    categoriesSuccess,
    clearCategoryErrors,
    deleteCategoryError,
    deleteCategorySuccess
} from "../redux/categories/categoryActions"
import {
    addProductError,
    addProductRequest,
    addProductSuccess,
    clearProductErrors,
    deleteProductError,
    deleteProductSuccess,
    editProductRequest,
    editProductSuccess,
    productsError,
    productsRequest,
    productsSuccess
} from "../redux/products/productActions"
import {
    clearOrderErrors,
    fetchOrderError,
    fetchOrderRequest,
    fetchOrdersError,
    fetchOrdersRequest,
    fetchOrdersSuccess,
    fetchOrderSuccess
} from "../redux/orders/orderActions"
import {
    addOfferError,
    addOfferRequest,
    addOfferSuccess,
    clearOfferErrors,
    deleteOfferError,
    deleteOfferRequest,
    deleteOfferSuccess,
    fetchOffersError,
    fetchOffersRequest,
    fetchOffersSuccess
} from "../redux/offers/offerActions"
import {
    activateOrgError,
    activateOrgRequest, activateOrgSuccess,
    addOrgError,
    addOrgRequest,
    addOrgSuccess,
    clearOrgError,
    editOrgError,
    editOrgRequest,
    editOrgSuccess,
    fetchOrgError,
    fetchOrgRequest,
    fetchOrgSuccess
} from "../redux/organization/organizationAction"
import {
    clearRequestErrors,
    requestLinkError,
    requestLinkRequest,
    requestLinkSuccess
} from "../redux/organization/activateActions"

const BASE_URL = process.env.REACT_APP_BASE_URL

const dispatchError = (dispatch, err, method) => {
    const {response: {data}} = err
    dispatch(method(data.errors))
}

export const formatDate = date => {
    const dt = new Date(date)
    return dt.toLocaleString()
}

export const signOutUser = history => {
    return (dispatch) => {
        sessionStorage.removeItem('savana')
        delete axios.defaults.headers.common['Authorization']
        dispatch(signOut())
        history.push('/')
    }
}

const setAuthHeader = token => {
    sessionStorage.setItem('savana', `Bearer ${token}`)
    axios.defaults.headers["common"]['Authorization'] = `Bearer ${token}`
}

export const authUser = (user, option) => async dispatch => {
    dispatch(authRequest())
    try {
        let result
        if (option === 'admin') {
            result = await axios.post(`${BASE_URL}/auth/signin`, user, {withCredentials: true, credentials: 'include'})
        } else {
            result = await axios.post(`${BASE_URL}/organizations/signin`, user, {
                withCredentials: true,
                credentials: 'include'
            })
        }
        setAuthHeader(result.data.token)
        dispatch(authSuccess(result.data.token))
    } catch (err) {
        dispatchError(dispatch, err, authError)
    }
}

export const clearAuthError = () => dispatch => dispatch(clearAuthErrors())

export const fetchOrganizations = () => async dispatch => {
    dispatch(fetchOrgRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/organizations`)
        dispatch(fetchOrgSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchOrgError)
    }
}

export const addOrganization = organization => async dispatch => {
    dispatch(addOrgRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/organizations`, organization)
        dispatch(addOrgSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, addOrgError)
    }
}

export const activateOrganization = (token, history) => async dispatch => {
    dispatch(activateOrgRequest())
    try{
        const {data} = await axios.get(`${BASE_URL}/organizations/activate/${token}`)
        dispatch(activateOrgSuccess(data))
        history.push('/')
    } catch (err){
        dispatchError(dispatch, err, activateOrgError)
    }
}

export const requestLink = email => async dispatch => {
    dispatch(requestLinkRequest())
    try{
        const {data} = await axios.post(`${BASE_URL}/organization/request/link`, {email})
        dispatch(requestLinkSuccess(data))
    } catch (err){
        dispatchError(dispatch, err, requestLinkError)
    }
}

export const clearRequestError = () => dispatch => dispatch(clearRequestErrors())

export const editOrganization = organization => async dispatch => {
    dispatch(editOrgRequest())
    try {
        const {data} = await axios.patch(`${BASE_URL}/organizations/${organization.id}`, organization)
        dispatch(editOrgSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, editOrgError)
    }
}

export const clearOrgErrors = () => dispatch => dispatch(clearOrgError())

export const fetchSections = () => async dispatch => {
    dispatch(sectionsRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/sections`)
        dispatch(sectionsSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, sectionsError)
    }
}

export const fetchCategories = () => async dispatch => {
    dispatch(categoriesRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/categories`)
        dispatch(categoriesSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, categoriesError)
    }
}

export const fetchCategoriesBySectionId = async (sectionId) => {
    try {
        const {data} = await axios.get(`${BASE_URL}/categories/section/${sectionId}`)
        return data
    } catch (e) {
        return e.response?.data
    }
}

export const addSection = name => async dispatch => {
    dispatch(addSectionRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/sections`, {name})
        dispatch(addSectionSuccess(data))
    } catch (e) {
        dispatchError(dispatch, e, addSectionError)
    }
}

export const deleteSection = id => async dispatch => {
    try {
        await axios.delete(`${BASE_URL}/sections/${id}`)
        dispatch(deleteSectionSuccess(id))
    } catch (err) {
        dispatchError(dispatch, err, deleteSectionError)
    }
}

export const clearSectErrors = () => async dispatch => {
    dispatch(clearSectionErrors())
}

export const addCategory = category => async dispatch => {
    dispatch(addCategoryRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/categories`, category)
        dispatch(addCategorySuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, addCategoryError)
    }
}

export const deleteCategory = id => async dispatch => {
    try {
        await axios.delete(`${BASE_URL}/categories/${id}`)
        dispatch(deleteCategorySuccess(id))
    } catch (err) {
        dispatchError(dispatch, err, deleteCategoryError)
    }
}

export const clearCatErrors = () => dispatch => dispatch(clearCategoryErrors())

export const fetchProducts = () => async dispatch => {
    dispatch(productsRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/products`)
        dispatch(productsSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, productsError)
    }
}

export const addProduct = product => async dispatch => {
    dispatch(addProductRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/products`, product)
        dispatch(addProductSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, addProductError)
    }
}

export const updateProduct = product => async dispatch => {
    dispatch(editProductRequest())
    try {
        const {data} = await axios.patch(`${BASE_URL}/products/${product.id}`, product)
        dispatch(editProductSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, addProductError)
    }
}

export const deleteProduct = id => async dispatch => {
    try {
        await axios.delete(`${BASE_URL}/products/${id}`)
        dispatch(deleteProductSuccess(id))
    } catch (err) {
        dispatchError(dispatch, err, deleteProductError)
    }
}

export const clearProdErrors = () => dispatch => {
    dispatch(clearProductErrors())
}

export const fetchOrders = () => async dispatch => {
    dispatch(fetchOrdersRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/orders`)
        dispatch(fetchOrdersSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchOrdersError)
    }
}

export const clearOrderError = () => dispatch => dispatch(clearOrderErrors())

export const fetchOffers = () => async dispatch => {
    dispatch(fetchOffersRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/offers`)
        dispatch(fetchOffersSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchOffersError)
    }
}

export const addOffer = offer => async dispatch => {
    dispatch(addOfferRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/offers`, offer)
        dispatch(addOfferSuccess(data))
        return data.id
    } catch (err) {
        dispatchError(dispatch, err, addOfferError)
    }
}

export const deleteOffer = id => async dispatch => {
    dispatch(deleteOfferRequest())
    try {
        const {data} = await axios.delete(`${BASE_URL}/offers/${id}`)
        dispatch(deleteOfferSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, deleteOfferError)
    }
}

export const clearOffersError = () => dispatch => dispatch(clearOfferErrors())

export const searchOrganizations = param => async dispatch => {
    dispatch(fetchOrgRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/organizations?search=${param}`)
        dispatch(fetchOrgSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchOrgError())
    }
}

export const fetchOrder = id => async dispatch => {
    dispatch(fetchOrderRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/orders/${id}`)
        dispatch(fetchOrderSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchOrderError)
    }
}
