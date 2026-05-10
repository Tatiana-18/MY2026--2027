/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CareerPage } from './pages/CareerPage';
import { MoneyPage } from './pages/MoneyPage';
import { TravelPage } from './pages/TravelPage';
import { SelfDevPage } from './pages/SelfDevPage';
import { HealthPage } from './pages/HealthPage';
import { ResetPage } from './pages/ResetPage';
import { AntiBurnoutPage } from './pages/AntiBurnoutPage';
import { ProofPage } from './pages/ProofPage';

import { AppProvider } from './context/AppContext';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomePage />;
      case 'career': return <CareerPage />;
      case 'money': return <MoneyPage />;
      case 'travel': return <TravelPage />;
      case 'selfdev': return <SelfDevPage />;
      case 'health': return <HealthPage />;
      case 'reset': return <ResetPage />;
      case 'burnout': return <AntiBurnoutPage />;
      case 'proof': return <ProofPage />;
      default: return <HomePage />;
    }
  };

  return (
    <AppProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
    </AppProvider>
  );
}

