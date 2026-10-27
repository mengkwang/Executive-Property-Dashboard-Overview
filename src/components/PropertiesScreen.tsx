import React, { useMemo, useState } from 'react';
import { AssetCategory, PropertyAsset, TabId } from '../types/portfolio';

interface PropertiesScreenProps {
  assets: PropertyAsset[];
  onSelectOnMap: (assetId: string) => void;
  onOpenBmsModal: (asset: PropertyAsset) => void;
  onOpenCameraModal: (asset: PropertyAsset) => void;
  onNavigateTab: (tab: TabId) => void;
}

export const PropertiesScreen: React.FC<PropertiesScreenProps> = ({
  assets,
  onSelectOnMap,
  onOpenBmsModal,
  onOpenCameraModal,
}) => {
  const [query, setQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | AssetCategory>(
    'all'
  );

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesCat =
        categoryFilter === 'all' || asset.category === categoryFilter;
      const q = query.trim().toLowerCase();
      if (!q) return matchesCat;
      return (
        matchesCat &&
        (asset.name.toLowerCase().includes(q) ||
          asset.subtitle.toLowerCase().includes(q) ||
          asset.certification.toLowerCase().includes(q) ||
          asset.transitLink.toLowerCase().includes(q))
      );
    });
  }, [assets, categoryFilter, query]);

  return (
    <div className="flex flex-col w-full px-4 lg:px-8 pb-8 pt-2 gap-4 max-w-[1440px] mx-auto">
      {/* Executive Asset Summary Header */}
      <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] leading-[14px] font-semibold uppercase tracking-[0.06em] text-outline">
              Rama IV · Sathorn · Wireless · Ratchada
            </span>
            <h2 className="text-[24px] leading-[30px] font-semibold tracking-[-0.018em] text-on-surface mt-0.5">
              Prime Commercial Directory
            </h2>
            <p className="text-[12px] leading-[16px] text-on-surface-variant mt-0.5">
              8 flagship mixed-use, Grade-A office, and convention complexes under unified command
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-numeric text-[11px] font-semibold shrink-0">
            2.80M sqm GFA
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3.5 bg-surface-container-low/70 rounded-lg p-2.5">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.05em] text-outline block">
              Avg Occupancy
            </span>
            <span className="font-label-numeric text-[13px] font-semibold text-on-surface">
              93.4% Leased
            </span>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.05em] text-outline block">
              ESG Portfolio
            </span>
            <span className="font-label-numeric text-[13px] font-semibold text-[#248a3d]">
              8/8 LEED &amp; WELL
            </span>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.05em] text-outline block">
              Peak Grid Cap
            </span>
            <span className="font-label-numeric text-[13px] font-semibold text-primary">
              129.6 MW
            </span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined text-[18px] text-outline absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search complex, corridor, LEED/WELL, transit..."
            className="w-full h-10 pl-9 pr-14 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-[13px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/25 shadow-xs"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-primary cursor-pointer"
            >
              Clear
            </button>
          ) : (
            <span className="font-label-numeric text-[11px] text-outline absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              8 Assets
            </span>
          )}
        </div>

        <div className="h-9 p-0.5 bg-surface-container-high rounded-xl flex items-center shadow-inner sm:w-auto">
          {(
            [
              { key: 'all', label: 'All (8)' },
              { key: 'mixed', label: 'Mixed-Use' },
              { key: 'office', label: 'Office' },
              { key: 'convention', label: 'Convention' },
            ] as const
          ).map((tab) => {
            const active = categoryFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setCategoryFilter(tab.key)}
                className={`flex-1 sm:flex-initial px-3 h-8 rounded-lg text-[12px] whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant font-medium hover:text-on-surface'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Properties Cards Grid */}
      {filteredAssets.length === 0 ? (
        <div className="rounded-xl bg-surface-container-lowest p-8 text-center shadow-sm">
          <span className="material-symbols-outlined text-[28px] text-outline">
            domain_disabled
          </span>
          <p className="text-[14px] font-semibold text-on-surface mt-2">
            No matching properties found
          </p>
          <p className="text-[12px] text-on-surface-variant mt-0.5">
            Try clearing your search query or switching the asset category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategoryFilter('all');
            }}
            className="mt-3 px-4 py-1.5 rounded-lg bg-primary text-on-primary text-[12px] font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {filteredAssets.map((asset) => {
            const isCaution = asset.statusTone === 'caution';
            const isPeak = asset.statusTone === 'peak';
            return (
              <div
                key={asset.id}
                className="rounded-xl bg-surface-container-lowest p-4 shadow-sm flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-[22px]">
                          {asset.icon}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-[17px] leading-[22px] font-semibold text-on-surface">
                            {asset.name}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full font-label-numeric text-[10px] font-semibold ${
                              isCaution
                                ? 'bg-[#ff9500]/15 text-[#c97700]'
                                : isPeak
                                ? 'bg-[#0071e3]/15 text-[#0071e3]'
                                : 'bg-[#34c759]/15 text-[#248a3d]'
                            }`}
                          >
                            {asset.statusBadge}
                          </span>
                        </div>
                        <p className="text-[12px] text-on-surface-variant">
                          {asset.mapCalloutSubtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Specs Table */}
                  <div className="grid grid-cols-3 gap-2 mt-3 bg-surface-container-low rounded-lg p-2.5">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-outline block">
                        Gross Floor Area
                      </span>
                      <span className="font-label-numeric text-[12px] font-semibold text-on-surface">
                        {asset.gfaSqm}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-outline block">
                        Occupancy
                      </span>
                      <span className="font-label-numeric text-[12px] font-semibold text-on-surface">
                        {asset.occupancyPct}% Active
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-outline block">
                        Plant Load
                      </span>
                      <span className="font-label-numeric text-[12px] font-semibold text-primary">
                        {asset.powerLoadMw}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 space-y-1 text-[12px] text-on-surface-variant">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#248a3d]">
                        verified
                      </span>
                      <span>{asset.certification}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-primary">
                        subway
                      </span>
                      <span>{asset.transitLink}</span>
                    </div>
                  </div>
                </div>

                {/* Action Row */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectOnMap(asset.id)}
                    className="h-9 px-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface text-[12px] font-semibold flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      pin_drop
                    </span>
                    <span className="whitespace-nowrap">Pin on Map</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenCameraModal(asset)}
                    className="h-9 px-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface text-[12px] font-semibold flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      videocam
                    </span>
                    <span className="whitespace-nowrap">Live Cam</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBmsModal(asset)}
                    className="h-9 px-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      speed
                    </span>
                    <span className="whitespace-nowrap">BMS Console</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
