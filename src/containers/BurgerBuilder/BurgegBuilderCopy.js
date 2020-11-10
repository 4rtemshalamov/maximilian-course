import React, {Component, useState} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Auxs from "../../hoc/auxs/auxs";
import OrderSummaryCopy from "../../components/Burger/OrderSummary/OrderSummaryCopy";
import CopyModal from "../../components/UI/Modal/CopyModal";


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const BurgerBuilderCopy = () => {
    const [state, setState] = useState({
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    })

   const  updatePurchaseState = (ingredients) => {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        setState( { purchasable: sum > 0 } );
    }

    const addIngredientHandler = ( type ) => {
        const oldCount = state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        updatePurchaseState(updatedIngredients);
    }

    const removeIngredientHandler = ( type ) => {
        const oldCount = state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        updatePurchaseState(updatedIngredients);
    }

    const purchaseHandler = () => {
        setState({purchasing: true});
    }

    const purchaseCancelHandler = () => {
        setState({purchasing: false});
    }

    const purchaseContinueHandler = () => {
        alert('You continue!');
    }

    const disabledInfo = {
        ...state.ingredients
    };
    for ( let key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
        <Auxs>
            <CopyModal show={state.purchasing} modalClosed={purchaseCancelHandler}>
                <OrderSummaryCopy
                    ingredients={state.ingredients}
                    price={state.totalPrice}
                    purchaseCancelled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler} />
            </CopyModal>
            <Burger ingredients={state.ingredients} />
            <BuildControls
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={state.purchasable}
                ordered={purchaseHandler}
                price={state.totalPrice} />
        </Auxs>
    )

}

export default BurgerBuilderCopy