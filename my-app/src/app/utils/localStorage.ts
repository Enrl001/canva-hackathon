interface Course {
  id: string;
  name: string;
  category: 'Core' | 'Major' | 'Sub-major' | 'Elective';
  major?: string;
  subMajor?: string;
}

interface CourseNode {
  id: string;
  label: string;
  category: string;
  topics?: any[];
  skills?: any[];
  connections?: any[];
  lectureNotes?: string;
}

interface StorageData {
  nodes: CourseNode[];
  edges: any[];
  timestamp?: string;
  version?: string;
}

const STORAGE_KEY = 'course_mind_map_data';

/**
 * Save course nodes and edges to localStorage
 */
export function saveCourseNodes(data: StorageData): void {
  try {
    const serializedData = JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      version: '1.0'
    });
    
    localStorage.setItem(STORAGE_KEY, serializedData);
    console.log('Course data saved to localStorage');
  } catch (error) {
    console.error('Error saving course data to localStorage:', error);
  }
}

/**
 * Load course nodes and edges from localStorage
 */
export function loadCourseNodes(): StorageData | null {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    if (!serializedData) {
      return null;
    }
    
    const data = JSON.parse(serializedData);
    console.log('Course data loaded from localStorage');
    
    return {
      nodes: data.nodes || [],
      edges: data.edges || [],
      timestamp: data.timestamp,
      version: data.version
    };
  } catch (error) {
    console.error('Error loading course data from localStorage:', error);
    return null;
  }
}

/**
 * Clear all saved course data from localStorage
 */
export function clearCourseNodes(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Course data cleared from localStorage');
  } catch (error) {
    console.error('Error clearing course data from localStorage:', error);
  }
}
