import { useContext } from 'react';
import { APIClientContext } from './APIClientContext';

export const useClient = () => useContext(APIClientContext).client;
