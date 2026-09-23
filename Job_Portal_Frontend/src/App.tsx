import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme, Divider, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css' ;
import '@mantine/carousel/styles.css' ;
import '@mantine/tiptap/styles.css' ;
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import Store from './Store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import ApplyJobPage from './ApplyJob/ApplyJobComp';
import Footer from './Footer/Footer';
import CompanyPage from './Pages/CompanyPage';
import FindJobPage from './Pages/FindJobPage';
import FindTalentPage from './Pages/FindTalentPage';
import HomePage from './Pages/HomePage';
import JobDescPage from './Pages/JobDescPage';
import JobHistoryPage from './Pages/JobHistoryPage';
import PostedJobPage from './Pages/PostedJobPage';
import PostJobPage from './Pages/PostJobPage';
import ProfilePage from './Pages/ProfilePage';
import SignUpPage from './Pages/SignUpPage';
import TalentProfilePage from './Pages/TalentProfilePage';
import { getItem } from './Services/LocalStorageService';
import AppRoutes from './Pages/AppRoutes';

function App() {
  const theme=createTheme({
    focusRing:"never",
    fontFamily:"Poppins sans-serif",
    primaryColor :"brightSun",
    primaryShade:4,
    colors :{
'brightSun': ['#fefde8','#fffec2','#fff987','#ffee43','#ffdd1145','#efc403', '#ce9800','#a46c04','#88540b','#734510', '#432405',
      ],
'mine-shaft': ['#f6f6f6','#e7e7e7','#d1d1d1','#b0b0b0','#888888','#6d6d6d','#5d5d5d','#4f4f4f','#454545','#3d3d3d','#2d2d2d' ]
    }
  })
  
  return (
    <Provider store={Store}>
    <MantineProvider defaultColorScheme ='dark' theme ={theme} >
      <Notifications position="top-center" zIndex={1000} />
      <AppRoutes/>
    </MantineProvider>
    </Provider>
  );
}

export default App;
