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
    if (typeof id === 'string') {
      dispatch(setIngredient(id));
    }
  }, [isLoading, id]);

  const ingredient = useSelector(selectIngredient);

  if (isLoading || !ingredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
