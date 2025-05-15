/**
 * Convert aircraft payware code to descriptive label(s)
 * 
 * @param code The single-letter code: P, F, D, or B
 * @returns A descriptive label or array of labels for the aircraft type
 */
export const getAircraftTypeLabels = (code: string | null | undefined): string[] => {
  if (!code) return ['Unknown'];
  
  switch (code.toUpperCase()) {
    case 'P':
      return ['Payware'];
    case 'F':
      return ['Freeware'];
    case 'D':
      return ['Deluxe Edition'];
    case 'B':
      return ['Payware', 'Freeware']; // Return both labels for 'B' type
    default:
      // For cases where the value is already a full label, just return it
      return [code];
  }
};

/**
 * Get appropriate chip color for aircraft type
 * 
 * @param code The single-letter code or full label
 * @returns Object with background and text colors
 */
export const getAircraftTypeColors = (code: string | null | undefined): { bg: string, color: string } => {
  if (!code) return { bg: 'rgba(255,255,255,0.04)', color: '#f4f4fa' };
  
  const normalizedCode = code.toUpperCase();
  
  switch (normalizedCode) {
    case 'P':
    case 'PAYWARE':
      return { bg: '#3B82F6', color: '#fff' }; // Blue
    case 'F':
    case 'FREEWARE':
      return { bg: '#10B981', color: '#fff' }; // Green
    case 'D':
    case 'DELUXE EDITION':
      return { bg: '#8B5CF6', color: '#fff' }; // Purple
    case 'B':
      return { bg: '#F59E42', color: '#fff' }; // Orange (this case shouldn't be used now)
    default:
      return { bg: 'rgba(255,255,255,0.04)', color: '#f4f4fa' };
  }
};
