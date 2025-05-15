import { getAircraftTypeLabels, getAircraftTypeColors } from '../aircraftTypeUtils';

describe('Aircraft Type Utils', () => {
  describe('getAircraftTypeLabels', () => {
    it('should return correct labels for payware codes', () => {
      expect(getAircraftTypeLabels('P')).toEqual(['Payware']);
      expect(getAircraftTypeLabels('F')).toEqual(['Freeware']);
      expect(getAircraftTypeLabels('D')).toEqual(['Deluxe Edition']);
      expect(getAircraftTypeLabels('B')).toEqual(['Payware', 'Freeware']);
    });

    it('should handle lowercase codes', () => {
      expect(getAircraftTypeLabels('p')).toEqual(['Payware']);
      expect(getAircraftTypeLabels('f')).toEqual(['Freeware']);
    });

    it('should return Unknown for null or undefined input', () => {
      expect(getAircraftTypeLabels(null)).toEqual(['Unknown']);
      expect(getAircraftTypeLabels(undefined)).toEqual(['Unknown']);
    });

    it('should pass through already expanded labels', () => {
      expect(getAircraftTypeLabels('Payware')).toEqual(['Payware']);
      expect(getAircraftTypeLabels('Custom Label')).toEqual(['Custom Label']);
    });
  });

  describe('getAircraftTypeColors', () => {
    it('should return correct colors for payware codes', () => {
      expect(getAircraftTypeColors('P')).toEqual({ bg: '#3B82F6', color: '#fff' });
      expect(getAircraftTypeColors('F')).toEqual({ bg: '#10B981', color: '#fff' });
      expect(getAircraftTypeColors('D')).toEqual({ bg: '#8B5CF6', color: '#fff' });
      expect(getAircraftTypeColors('B')).toEqual({ bg: '#F59E42', color: '#fff' });
    });

    it('should return default colors for unknown input', () => {
      expect(getAircraftTypeColors(null)).toEqual({ bg: 'rgba(255,255,255,0.04)', color: '#f4f4fa' });
      expect(getAircraftTypeColors('X')).toEqual({ bg: 'rgba(255,255,255,0.04)', color: '#f4f4fa' });
    });
  });
});
