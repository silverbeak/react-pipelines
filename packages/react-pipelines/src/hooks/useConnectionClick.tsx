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
    console.log(connectionLineData)

},
    [connectionLineData, onConnectionLineUpdate]
);
    return { handleConnectionLineRightClick };
};

export default useConnectionRightClick;