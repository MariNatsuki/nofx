package recommender

import (
	"fmt"
	"os"
	"time"
)

const (
	// StaleLockThreshold is the duration after which a lock is considered stale
	StaleLockThreshold = 30 * time.Minute
)

// AcquireLock attempts to acquire an exclusive lock on the lock file
// Returns an error if the lock is already held and not stale
func AcquireLock(lockPath string) error {
	// Check if lock file exists and if it's stale
	if info, err := os.Stat(lockPath); err == nil {
		// Lock file exists, check if it's stale
		if time.Since(info.ModTime()) > StaleLockThreshold {
			// Lock is stale, remove it
			os.Remove(lockPath)
		} else {
			// Lock is still valid
			return fmt.Errorf("lock file exists and is not stale (created at %v)", info.ModTime())
		}
	}

	// Try to create the lock file with exclusive access
	// On Windows, we'll use O_CREATE|O_EXCL, on Unix we can use the same
	file, err := os.OpenFile(lockPath, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0644)
	if err != nil {
		if os.IsExist(err) {
			return fmt.Errorf("lock file already exists")
		}
		return fmt.Errorf("failed to create lock file: %w", err)
	}

	// Write the current timestamp to the lock file
	now := time.Now().Format(time.RFC3339)
	if _, err := file.WriteString(now); err != nil {
		file.Close()
		os.Remove(lockPath)
		return fmt.Errorf("failed to write to lock file: %w", err)
	}

	file.Close()
	return nil
}

// ReleaseLock removes the lock file
func ReleaseLock(lockPath string) error {
	err := os.Remove(lockPath)
	if err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("failed to remove lock file: %w", err)
	}
	return nil
}

// IsLocked checks if a lock file exists and is valid (not stale)
func IsLocked(lockPath string) bool {
	info, err := os.Stat(lockPath)
	if err != nil {
		return false
	}

	// Check if lock is stale
	if time.Since(info.ModTime()) > StaleLockThreshold {
		// Lock is stale, consider it as not locked
		return false
	}

	return true
}

// LockFile represents a lock that can be released
type LockFile struct {
	path string
}

// AcquireLockFile creates a lock file and returns a LockFile that can be released
func AcquireLockFile(lockPath string) (*LockFile, error) {
	if err := AcquireLock(lockPath); err != nil {
		return nil, err
	}
	return &LockFile{path: lockPath}, nil
}

// Release releases the lock
func (lf *LockFile) Release() error {
	if lf == nil {
		return nil
	}
	return ReleaseLock(lf.path)
}

