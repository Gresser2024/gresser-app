import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UnionBox from './UnionBox';
import unionColors from './UnionColors';
import './Trades.css';

const Trades = () => {
    const dispatch = useDispatch();
    const unions = useSelector((state) => state.unionReducer);
    const unionBox = useSelector((state) => state.unionBoxReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_EMPLOYEE_UNION' });
        dispatch({ type: 'FETCH_UNIONS_WITH_EMPLOYEES' });
    }, [dispatch]);

    const moveEmployee = (employeeId, targetId, sourceType, targetType) => {
        dispatch({ 
            type: 'MOVE_EMPLOYEE', 
            payload: { employeeId, targetId, sourceType, targetType } 
        });
    };

    return (
        <div className="trades-container">
            <h3 className='union-title'>Unions</h3>
            <div className="unions-container">
                {Array.isArray(unionBox) && unionBox.map(union => (
                    <div key={union.id} className="union-box">
                        <UnionBox
                            id={union.id}
                            union_name={union.union_name}
                            employees={union.employees || []}
                            moveEmployee={moveEmployee}
                            color={unionColors[union.union_name]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trades;