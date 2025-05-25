import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  setIngredient,
  selectIngredient,
  selectIsLoading
} from '../../services/ingredients-slice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && typeof id === 'string') {
      dispatch(setIngredient(id));
    }
  }, [isLoading]);

  const ingredient = useSelector(selectIngredient);
  const ingredientData = ingredient;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
