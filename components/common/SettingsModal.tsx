'use client';

import { useDispatch, useSelector } from 'react-redux';
import { X, Save, RefreshCw } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import {
  useModal,
  useChartSettings,
  useTableSettings,
  useTradingSettings,
  setDefaultSlippage,
  toggleTradingSetting,
  setChartType,
  setTimeframe,
  toggleIndicator,
  toggleChartSetting,
  toggleColumnVisibility,
  setItemsPerPage,
  resetChartSettings,
  resetTableSettings,
  resetTradingSettings,
  closeModal,
} from '@/lib/store/hooks';

export function SettingsModal() {
  const dispatch = useDispatch();
  const settingsModal = useModal('settings');
  const chartSettings = useChartSettings();
  const tableSettings = useTableSettings();
  const tradingSettings = useTradingSettings();

  if (!settingsModal?.isOpen) return null;

  const handleSave = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('axiom-settings', JSON.stringify({
      chart: chartSettings,
      table: tableSettings,
      trading: tradingSettings,
    }));
    dispatch(closeModal('settings'));
  };

  return (
    <Modal>
      <div className="max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <p className="text-gray-400">Customize your trading experience</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(closeModal('settings'))}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="trading" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trading">Trading</TabsTrigger>
              <TabsTrigger value="chart">Charts</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>

            {/* Trading Settings */}
            <TabsContent value="trading" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Default Slippage</Label>
                  <div className="space-y-3">
                    <Slider
                      value={[tradingSettings.defaultSlippage]}
                      onValueChange={([value]) => dispatch(setDefaultSlippage(value))}
                      min={0.1}
                      max={5}
                      step={0.1}
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>0.1%</span>
                      <span className="font-medium text-white">
                        {tradingSettings.defaultSlippage}%
                      </span>
                      <span>5%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Confirm Orders</Label>
                    <Switch
                      checked={tradingSettings.confirmOrders}
                      onCheckedChange={() => dispatch(toggleTradingSetting('confirmOrders'))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Advanced Options</Label>
                    <Switch
                      checked={tradingSettings.showAdvancedOptions}
                      onCheckedChange={() => dispatch(toggleTradingSetting('showAdvancedOptions'))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Enable Sounds</Label>
                    <Switch
                      checked={tradingSettings.enableSounds}
                      onCheckedChange={() => dispatch(toggleTradingSetting('enableSounds'))}
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Default Order Type</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={tradingSettings.defaultOrderType === 'market' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => dispatch(toggleTradingSetting('defaultOrderType'))}
                    >
                      Market
                    </Button>
                    <Button
                      variant={tradingSettings.defaultOrderType === 'limit' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => dispatch(toggleTradingSetting('defaultOrderType'))}
                    >
                      Limit
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Chart Settings */}
            <TabsContent value="chart" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Chart Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['candles', 'line', 'area', 'bars'] as const).map((type) => (
                      <Button
                        key={type}
                        variant={chartSettings.type === type ? 'default' : 'outline'}
                        onClick={() => dispatch(setChartType(type))}
                        className="capitalize"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Timeframe</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['1m', '5m', '15m', '1h', '4h', '1d', '1w'] as const).map((tf) => (
                      <Button
                        key={tf}
                        variant={chartSettings.timeframe === tf ? 'default' : 'outline'}
                        onClick={() => dispatch(setTimeframe(tf))}
                        size="sm"
                      >
                        {tf}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Indicators</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['RSI', 'MACD', 'BB', 'VWAP', 'EMA', 'SMA'].map((indicator) => (
                      <Button
                        key={indicator}
                        variant={chartSettings.indicators.includes(indicator) ? 'default' : 'outline'}
                        onClick={() => dispatch(toggleIndicator(indicator))}
                        size="sm"
                      >
                        {indicator}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Show Volume</Label>
                    <Switch
                      checked={chartSettings.showVolume}
                      onCheckedChange={() => dispatch(toggleChartSetting('showVolume'))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Grid</Label>
                    <Switch
                      checked={chartSettings.showGrid}
                      onCheckedChange={() => dispatch(toggleChartSetting('showGrid'))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Crosshair</Label>
                    <Switch
                      checked={chartSettings.showCrosshair}
                      onCheckedChange={() => dispatch(toggleChartSetting('showCrosshair'))}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Table Settings */}
            <TabsContent value="table" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Visible Columns</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'pair', 'price', 'change24h', 'volume24h', 
                      'liquidity', 'age', 'tags', 'actions'
                    ].map((column) => (
                      <Button
                        key={column}
                        variant={tableSettings.visibleColumns.includes(column) ? 'default' : 'outline'}
                        onClick={() => dispatch(toggleColumnVisibility(column))}
                        className="capitalize"
                        size="sm"
                      >
                        {column}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Items Per Page</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 50, 100].map((count) => (
                      <Button
                        key={count}
                        variant={tableSettings.itemsPerPage === count ? 'default' : 'outline'}
                        onClick={() => dispatch(setItemsPerPage(count))}
                        size="sm"
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Show Liquidity Bars</Label>
                    <Switch
                      checked={tableSettings.showLiquidityBars}
                      onCheckedChange={() => dispatch(toggleTableSetting('showLiquidityBars'))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Sparklines</Label>
                    <Switch
                      checked={tableSettings.showSparklines}
                      onCheckedChange={() => dispatch(toggleTableSetting('showSparklines'))}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => dispatch(resetChartSettings())}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Charts
              </Button>
              <Button
                variant="outline"
                onClick={() => dispatch(resetTableSettings())}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Table
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => dispatch(closeModal('settings'))}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}