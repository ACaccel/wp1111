// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 

    // TODO Part I-3-a: find the information to all restaurants
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy

    try {
        const existing = await Info.find({});
        if (existing) {
            let result = existing.map(
                (obj) => {
                    return { id: obj.id, 
                            img: obj.img,
                            time: obj.time,
                            name: obj.name,
                            price: obj.price,
                            distance: obj.distance,
                            tag: obj.tag }
                }
            );
            // price filter
            let tempResult = result;
            if (priceFilter !== undefined) {
                console.log(priceFilter)
                for(let i = 0; i < priceFilter.length; i++) {   // ($, $$, $$$ to 1, 2, 3)
                    if ( priceFilter[i] === '1' || priceFilter[i] === '2' || priceFilter[i] === '3')
                        priceFilter[i] = parseInt(priceFilter[i])   // or ('1' to 1), what a shit testing input!
                    else
                        priceFilter[i] = priceFilter[i].length;
                }
                result = [];
                priceFilter.forEach((pfilter) => {    //priceFilter = [1, 2...]
                    let temp = tempResult.filter(({ price }) => (price === pfilter))
                    temp.forEach((t) => {
                        if (!result.includes(t))
                            result.push(t);
                    })
                })
            }
            // meal filter
            tempResult = result;
            if (mealFilter !== undefined) {
                console.log(mealFilter)
                result = [];
                mealFilter.forEach((mfilter) => {    //mealFilter= [ 'Breakfast', 'Lunch' ]
                    let temp = tempResult.filter(({ tag }) => {
                        let hasTag = false;
                        tag.forEach((tag1) => {
                            if (tag1 === mfilter) {
                                hasTag = true
                                return;
                            }
                        })
                        return hasTag;
                    })
                    temp.forEach((t) => {
                        if (!result.includes(t))
                            result.push(t);
                    })
                })
            }
            // type filter
            tempResult = result;
            if (typeFilter !== undefined) {
                console.log(typeFilter)
                result = [];
                typeFilter.forEach((tfilter) => {    //typeFilter= [ 'Chinese', 'American' ]
                    let temp = tempResult.filter(({ tag }) => {
                        let hasTag = false;
                        tag.forEach((tag1) => {
                            if (tag1 === tfilter) {
                                hasTag = true
                                return;
                            }
                        })
                        return hasTag;
                    })
                    temp.forEach((t) => {
                        if (!result.includes(t))
                            result.push(t);
                    })
                })
            }
            
            if (sortBy === 'price') {
                result.sort((a, b) => {
                    return a.price - b.price;
                });
            }
            else if (sortBy === 'distance') {
                result.sort((a, b) => {
                    return a.distance - b.distance;
                })
            }
            console.log(result.length)
            res.status(200).send({ message: 'success', contents: result })
        }
        else {
            res.status(200).send({ message: 'error', contents: 'not found' })
        }
    }catch(err) {
        res.status(403).send({ message: 'error', contents: err })
    }
    
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    try {
        const obj = await Info.findOne({ id });
        if (obj) {
            console.log(obj)
            res.status(200).send({ message: 'success', contents: {
                time: obj.time,
                name: obj.name,
                price: obj.price,
                distance: obj.distance,
                tag: obj.tag
            } })
        }
        else {
            res.status(200).send({ message: 'error', contents: 'not found' })
        }
    } catch(err) {
        res.status(403).send({ message: 'error', contents: err })
    }
}