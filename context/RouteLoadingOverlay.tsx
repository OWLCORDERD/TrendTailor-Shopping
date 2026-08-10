'use client';

import { createContext, useState } from "react";

interface RouteLoadingOverlayProps {
    isLoading: boolean;
    startRouteTransition: (navigationFn: () => void) => void;
    finishRouteTransition: () => void;
}

const RouteLoadingContext = createContext<RouteLoadingOverlayProps>({
    isLoading: false,
    startRouteTransition: () => {},
    finishRouteTransition: () => {},
});

export const RouteLoadingOverlayProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const startRouteTransition = (navigationFn: () => void) => {
        setIsLoading(true);

        requestAnimationFrame(() => {
            navigationFn();
            setIsLoading(false);
        });
    };

    const finishRouteTransition = () => {
        requestAnimationFrame(() => {
            setIsLoading(false);
        });
    };

    return (
        <RouteLoadingContext.Provider value={{ isLoading, startRouteTransition, finishRouteTransition }}>
            {isLoading && <div className="fixed inset-0 bg-white z-50">Loading...</div>}
            {children}
        </RouteLoadingContext.Provider>
    );
};