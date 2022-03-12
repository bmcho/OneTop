from datetime import datetime

class StopWatch:
    def __init__(self):
        self.reset()

    def reset(self):
        self.start_datetime = None
        self.end_datetime = None
        
    def start(self):
        self.reset()
        self.start_datetime = datetime.now()
        
    def stop(self):
        self.end_datetime = datetime.now()
        return self.get_elapsed_seconds()
        
    def get_elapsed_seconds(self):
        assert isinstance(self.start_datetime, datetime), 'call start() first'
        assert isinstance(self.end_datetime, datetime),   'call end() fist'
        # Return the total number of seconds contained in the duration
        # Equivalent to td / timedelta(seconds=1)
        return (self.end_datetime - self.start_datetime).total_seconds()