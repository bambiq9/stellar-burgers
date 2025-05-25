import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  setIngredient,
  selectIngredient
} from '../../services/ingredients-slice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  if (typeof id === 'string') dispatch(setIngredient(id));

  const ingredient = useSelector(selectIngredient);

  /** TODO: взять переменную из стора */
  const ingredientData = ingredient;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
