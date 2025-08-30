import React, { useState } from 'react';
import { 
  Text, 
  Button, 
  Input,
  makeStyles
} from '@fluentui/react-components';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #ced4da',
    padding: '16px 24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  nav: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  searchContainer: {
    position: 'relative',
  },
  searchInput: {
    position: 'absolute',
    top: '100%',
    right: '0',
    marginTop: '8px',
    width: '300px',
    zIndex: 1000,
    backgroundColor: '#ffffff',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    padding: '16px',
  },
  searchInputField: {
    width: '100%',
    marginBottom: '12px',
  },
  searchActions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
  },
  searchOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
});

interface HeaderProps {
  onSearchClick?: () => void;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearchClick, 
  onSearch
}) => {
  const styles = useStyles();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    if (onSearchClick) {
      onSearchClick();
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    } else if (e.key === 'Escape') {
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleOverlayClick = () => {
    setShowSearch(false);
    setSearchQuery('');
  };

  return (
    <header className={styles.header}>
      {showSearch && (
        <div className={styles.searchOverlay} onClick={handleOverlayClick} />
      )}
      
      <div className={styles.headerContent}>
        <Text className={styles.logo}>
          Test Vibes
        </Text>
        
        <nav className={styles.nav}>
          <div className={styles.searchContainer}>
            <Button 
              appearance="subtle" 
              onClick={handleSearchClick}
              className={styles.navButton}
            >
              🔍 Buscar
            </Button>
            
            {showSearch && (
              <div className={styles.searchInput}>
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  appearance="outline"
                  className={styles.searchInputField}
                  autoFocus
                />
                <div className={styles.searchActions}>
                  <Button 
                    appearance="outline" 
                    size="small"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearch(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    appearance="outline" 
                    size="small"
                    onClick={handleSearchSubmit}
                    disabled={!searchQuery.trim()}
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
