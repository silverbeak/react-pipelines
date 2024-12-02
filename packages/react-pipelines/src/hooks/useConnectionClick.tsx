import { useCallback } from 'react';
import { ConnectionLineData } from '../utils/ConnectionUtils'

const useConnectionRightClick = (
    connectionLineData: ConnectionLineData[],
    onConnectionLineUpdate: (connectionLineData: ConnectionLineData[]) => void = () => {},
) => {
    const handleConnectionLineRightClick = useCallback((lineKey: string, event: React.MouseEvent) => {
        event.preventDefault()

        const updatedConnectionLineData = connectionLineData.filter(
            (line) => line.key !== lineKey
    );
    onConnectionLineUpdate(updatedConnectionLineData);
},
    [connectionLineData, onConnectionLineUpdate]
);

    const handleOutputConnectionPointRightClick = useCallback((connectionPointId: string, event: React.MouseEvent) => {
        event.preventDefault();
        const updatedConnectionLineData = connectionLineData.filter(
            (line) => line.originConnectionPointId !== connectionPointId
        );
        onConnectionLineUpdate(updatedConnectionLineData);        
    },
    [connectionLineData, onConnectionLineUpdate]
);
    return {
        handleConnectionLineRightClick,
        handleOutputConnectionPointRightClick,
    };
};

export default useConnectionRightClick;