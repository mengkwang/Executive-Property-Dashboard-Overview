import React, { useCallback, useRef, useState } from 'react';
import { ActiveModal, CommandModals } from './components/CommandModals';
import { EventsScreen } from './components/EventsScreen';
import { IncidentsScreen } from './components/IncidentsScreen';
import { MapOverviewScreen } from './components/MapOverviewScreen';
import { PropertiesScreen } from './components/PropertiesScreen';
import { ReadinessScreen } from './components/ReadinessScreen';
import {
  INITIAL_INCIDENTS,
  INITIAL_NOTIFICATIONS,
  OCTOBER_HORIZON_DAYS,
  PORTFOLIO_ASSETS,
  SCHEDULED_EVENTS,
} from './data/portfolioData';
import { NotificationItem, PropertyAsset, TabId } from './types/portfolio';

interface ToastState {
  visible: boolean;
  title: string;
  subtitle: string;
  badge: string;
}

const NAV_ITEMS: { id: TabId; label: string; headerTitle: string; icon: string }[] = [
  { id: TabId.Map, label: 'Map', headerTitle: 'Map & Overview', icon: 'map' },
  {
    id: TabId.Readiness,
    label: 'Readiness',
    headerTitle: 'Readiness',
    icon: 'health_and_safety',
  },
  {
    id: TabId.Incidents,
    label: 'Incidents',
    headerTitle: 'Incidents',
    icon: 'warning',
  },
  {
    id: TabId.Events,
    label: 'Events',
    headerTitle: 'Events',
    icon: 'calendar_today',
  },
  {
    id: TabId.Properties,
    label: 'Properties',
    headerTitle: 'Properties',
    icon: 'apartment',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.Map);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('one-bangkok');
  const [sathornAcknowledged, setSathornAcknowledged] = useState<boolean>(false);
  const [silomMarshalsCount, setSilomMarshalsCount] = useState<number>(2);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [broadcastLogs, setBroadcastLogs] = useState([
    {
      time: '14:28 ICT',
      target: 'Sathorn Square',
      level: 'Caution',
      message: 'Lift Car #4 High-Rise Zone scheduled optical sensor recalibration.',
    },
    {
      time: '14:05 ICT',
      target: 'QSNCC',
      level: 'Peak Load',
      message:
        'MRT Benjakitti pedestrian link marshals deployed for ASEAN Tech Summit.',
    },
    {
      time: '13:40 ICT',
      target: 'QSNCC',
      level: 'Security Sweep',
      message: 'Hall 3 VIP motorcade security sweep completed (Clearance Alpha).',
    },
  ]);

  const [toast, setToast] = useState<ToastState>({
    visible: false,
    title: 'Directive Dossier Generated',
    subtitle: 'Sent to Central Portfolio Ops',
    badge: 'PDF • 4.8MB',
  });

  const toastTimerRef = useRef<number | null>(null);

  const triggerToast = useCallback(
    (title: string, subtitle: string, badge = 'SYNCED') => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      setToast({ visible: true, title, subtitle, badge });
      toastTimerRef.current = window.setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 2800);
    },
    []
  );

  const handleAcknowledgeSathorn = () => {
    setSathornAcknowledged(true);
    triggerToast(
      'Sathorn Square Alert Acknowledged',
      'Lift #4 maintenance logged under OTIS/KONE supervision',
      'ACK'
    );
  };

  const handleDeployMarshal = () => {
    setSilomMarshalsCount((c) => c + 1);
    triggerToast(
      'Crowd Marshal Dispatched',
      'Additional marshal routed to Silom Edge BTS Skywalk Portal',
      '+1 UNIT'
    );
  };

  const handleSendBroadcast = (
    target: string,
    level: string,
    message: string
  ) => {
    setBroadcastLogs((prev) => [
      {
        time: '14:43 ICT',
        target,
        level,
        message,
      },
      ...prev,
    ]);
    triggerToast(
      'Security Directive Broadcasted',
      `Transmitted to ${target}`,
      'L4 SENT'
    );
  };

  const handleSelectOnMap = (assetId: string) => {
    setSelectedAssetId(assetId);
    setActiveTab(TabId.Map);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const currentNavMeta =
    NAV_ITEMS.find((item) => item.id === activeTab) || NAV_ITEMS[0];

  return (
    <div className="min-h-screen bg-surface text-on-surface flex">
      {/* Desktop Master Split-View Translucent Sidebar (macOS / iPadOS style per design spec) */}
      <aside className="hidden lg:flex flex-col w-[260px] shrink-0 fixed inset-y-0 left-0 z-40 bg-surface-container-low/85 backdrop-blur-2xl border-r border-outline-variant/35">
        <div className="h-14 px-5 flex items-center justify-between border-b border-outline-variant/25">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34c759]" />
            <span className="text-[15px] font-bold tracking-tight text-on-surface">
              Bangkok Prime
            </span>
          </div>
          <span className="font-label-numeric text-[11px] font-semibold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">
            100%
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Primary Command Screens */}
          <div>
            <span className="px-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-outline block mb-1.5">
              Command Views
            </span>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.id === activeTab;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigateTab(item.id)}
                    className={`w-full px-3 py-2 rounded-lg flex items-center justify-between text-[13px] transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-primary text-on-primary font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[19px]">
                        {item.icon}
                      </span>
                      <span>{item.headerTitle}</span>
                    </div>
                    {item.id === TabId.Incidents && !sathornAcknowledged && (
                      <span
                        className={`font-label-numeric text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                        }`}
                      >
                        1
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Portfolio Master-Detail Quick Jump */}
          <div>
            <div className="px-2.5 flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-outline">
                Corridor Assets (8)
              </span>
              <span className="font-label-numeric text-[10px] text-[#248a3d] font-semibold">
                97.4%
              </span>
            </div>
            <div className="space-y-0.5">
              {PORTFOLIO_ASSETS.map((asset: PropertyAsset) => {
                const isSelectedOnMap =
                  activeTab === TabId.Map && selectedAssetId === asset.id;
                const isCaution =
                  asset.statusTone === 'caution' && !sathornAcknowledged;
                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => handleSelectOnMap(asset.id)}
                    className={`w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isSelectedOnMap
                        ? 'bg-primary-fixed/60 text-on-primary-fixed font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface'
                    }`}
                  >
                    <span className="text-[12px] truncate">{asset.name}</span>
                    <span
                      className={`font-label-numeric text-[11px] ${
                        isCaution
                          ? 'text-[#c97700] font-semibold'
                          : 'text-outline'
                      }`}
                    >
                      {asset.readinessPct === 100
                        ? '100%'
                        : `${asset.readinessPct.toFixed(1)}%`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-outline-variant/25">
          <button
            type="button"
            onClick={() => setActiveModal({ type: 'broadcast' })}
            className="w-full h-9 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface text-[12px] font-semibold shadow-xs border border-outline-variant/30 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">
              campaign
            </span>
            <span>Broadcast Directive</span>
          </button>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px]">
        {/* Top Sticky Translucent Header (Matches Reference Screenshots 1:1) */}
        <header className="fixed top-0 left-0 lg:left-[260px] right-0 z-30 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="h-14 px-4 lg:px-8 max-w-[1440px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/80 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
                <span className="font-label-numeric text-[12px] leading-[16px] font-medium uppercase text-on-surface tracking-wide">
                  BKK 100%
                </span>
              </div>
              <h1 className="text-[17px] leading-[22px] font-semibold text-on-surface tracking-[-0.012em] ml-1">
                {currentNavMeta.headerTitle}
              </h1>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setActiveModal({ type: 'notifications' })}
                className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  notifications
                </span>
                {unreadCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error" />
                )}
              </button>
              <button
                type="button"
                aria-label="Executive Profile"
                onClick={() => setActiveModal({ type: 'profile' })}
                className="w-8 h-8 rounded-full bg-primary hover:bg-primary-container flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Active Screen Viewport */}
        <main className="flex-1 w-full pt-14 pb-24 lg:pb-10 bg-surface min-h-screen">
          {activeTab === TabId.Map && (
            <MapOverviewScreen
              assets={PORTFOLIO_ASSETS}
              selectedAssetId={selectedAssetId}
              onSelectAsset={setSelectedAssetId}
              sathornAcknowledged={sathornAcknowledged}
              onAcknowledgeSathorn={handleAcknowledgeSathorn}
              onNavigateTab={handleNavigateTab}
              onOpenCameraModal={(asset) =>
                setActiveModal({ type: 'camera', asset })
              }
              onOpenBmsModal={(asset) => setActiveModal({ type: 'bms', asset })}
              onOpenLogHistory={() => setActiveModal({ type: 'log-history' })}
            />
          )}

          {activeTab === TabId.Readiness && (
            <ReadinessScreen
              assets={PORTFOLIO_ASSETS}
              onOpenBmsModal={(asset) => setActiveModal({ type: 'bms', asset })}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === TabId.Incidents && (
            <IncidentsScreen
              incidents={INITIAL_INCIDENTS}
              assets={PORTFOLIO_ASSETS}
              sathornAcknowledged={sathornAcknowledged}
              onAcknowledgeSathorn={handleAcknowledgeSathorn}
              onDeployMarshal={handleDeployMarshal}
              silomMarshalsCount={silomMarshalsCount}
              onOpenCameraModal={(asset) =>
                setActiveModal({ type: 'camera', asset })
              }
              onOpenBroadcastModal={() =>
                setActiveModal({ type: 'broadcast' })
              }
              onOpenCommanderModal={() =>
                setActiveModal({ type: 'commander' })
              }
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === TabId.Events && (
            <EventsScreen
              horizonDays={OCTOBER_HORIZON_DAYS}
              events={SCHEDULED_EVENTS}
              onInspectEvent={(event) =>
                setActiveModal({ type: 'event-detail', event })
              }
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === TabId.Properties && (
            <PropertiesScreen
              assets={PORTFOLIO_ASSETS}
              onSelectOnMap={handleSelectOnMap}
              onOpenBmsModal={(asset) => setActiveModal({ type: 'bms', asset })}
              onOpenCameraModal={(asset) =>
                setActiveModal({ type: 'camera', asset })
              }
              onNavigateTab={handleNavigateTab}
            />
          )}
        </main>

        {/* Bottom Mobile Tab Navigation Bar (Matches 5-Tab Bar in Reference Screenshots) */}
        <nav
          aria-label="Primary Navigation"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.04)]"
        >
          <div className="flex items-center justify-around h-16 px-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => handleNavigateTab(item.id)}
                  className={`flex flex-col items-center justify-center w-16 h-12 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      isActive ? 'material-symbols-filled' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[11px] leading-[14px] tracking-[0.04em] mt-0.5">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Interactive Feedback Toast */}
      <div
        className={`fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] bg-inverse-surface text-inverse-on-surface rounded-xl p-3.5 shadow-xl flex items-center justify-between transition-all duration-300 z-50 ${
          toast.visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="material-symbols-outlined text-primary-fixed-dim text-[22px] shrink-0">
            check_circle
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-inverse-on-surface truncate">
              {toast.title}
            </span>
            <span className="text-[12px] text-outline-variant truncate">
              {toast.subtitle}
            </span>
          </div>
        </div>
        <span className="text-[11px] px-2 py-1 rounded bg-surface-container-highest text-on-surface font-bold shrink-0 ml-2">
          {toast.badge}
        </span>
      </div>

      {/* Interactive Modals & Drawers */}
      <CommandModals
        modal={activeModal}
        onClose={() => setActiveModal(null)}
        assets={PORTFOLIO_ASSETS}
        notifications={notifications}
        onMarkAllRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
        }
        onSelectNotification={(notif) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
          );
          setActiveModal(null);
          handleNavigateTab(notif.targetTab);
        }}
        onSendBroadcast={handleSendBroadcast}
        broadcastLogs={broadcastLogs}
        onTriggerToast={triggerToast}
        onNavigateTab={handleNavigateTab}
      />
    </div>
  );
}
