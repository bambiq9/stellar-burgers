import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeIngredient,
  reorderIngredient
} from '../../services/constructor-slice';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () =>
      dispatch(reorderIngredient({ ingredient, direction: 'down' }));

    const handleMoveUp = () =>
      dispatch(reorderIngredient({ ingredient, direction: 'up' }));

    const handleClose = () => {
      const payload: TConstructorIngredient = ingredient;
      dispatch(removeIngredient(payload));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
