import React from "react";
import {AppLink, NavigationMenu} from '@shopify/app-bridge/actions';
import {useAppBridge} from '@shopify/app-bridge-react';
import {useLocation} from 'react-router-dom';

function AppNavigation() {
    const app = useAppBridge();

    const location = useLocation();

    const home = AppLink.create(app, {
        label: 'Home',
        destination: '/',
    });

    const event = AppLink.create(app, {
        label: 'Event',
        destination: '/event',
    });
    
    const form = AppLink.create(app, {
        label: 'Form',
        destination: '/form',
    });

    const navigationMenu = NavigationMenu.create(app, {
        items: [home, event, form],
    });

    switch (location.pathname) {
        case "/":
            navigationMenu.set({active: home});
            break;
        case "/event":
            navigationMenu.set({active: event});
            break;
        case "/form":
            navigationMenu.set({active: form});
            break;
        default:
            navigationMenu.set({active: undefined});
    }

    return null
}

export default AppNavigation;
