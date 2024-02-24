import { useParams } from "react-router-dom"
import CardContainer from "../components/cardContainer/CardContainer"
import { setCurrentIcon } from "../redux/sideBarSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"



const ResultsPage = () => {
    const { term } = useParams()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCurrentIcon(""))
    }, [])

    return (
        <div className="body">
            <h1>"These are the results for {term}"</h1>
            <CardContainer usingSearch={true} term={term} />
        </div>
    )
}

export default ResultsPage